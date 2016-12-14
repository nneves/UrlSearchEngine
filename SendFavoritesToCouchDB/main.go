package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
	"time"
)

func validateParams() (string, string) {
	argsWithoutProg := os.Args[1:]
	numArgs := len(argsWithoutProg)
	if numArgs == 0 {
		fmt.Println("Requires bookmarks file path argument!")
		os.Exit(1)
	} else if numArgs == 1 {
		return argsWithoutProg[0], string("")
	}
	return argsWithoutProg[0], argsWithoutProg[1]
}

func readBookmarkFile(filePath string, skipUntilUrl string, chData chan string) {
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	sendData := true
	if len(skipUntilUrl) > 0 {
		sendData = false
	}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		if len(skipUntilUrl) > 0 && strings.Contains(scanner.Text(), skipUntilUrl) {
			sendData = true
			fmt.Println("")
		} else if !sendData {
			fmt.Printf(".")
		}
		if sendData {
			chData <- scanner.Text()
		}
	}
	close(chData)
}

func parseBookmarkData(chData chan string, chUrl chan string) {
	re := regexp.MustCompile(`(HREF=)(.*)(ADD_DATE)`)
	for dataline := range chData {
		for _, match := range re.FindAllString(dataline, -1) {
			url := strings.Split(match, "\"")
			chUrl <- url[1]
		}
	}
	close(chUrl)
}

func sendUrlToService(chUrl chan string, getcontentservice string, setcontentdatabase string, done chan bool) {
	workers := make(chan bool, 10) // number of workers (concurrent requests)
	for DataUrl := range chUrl {
		workers <- true
		ServiceUrl := getcontentservice + DataUrl
		// check for unsupported urls (.pdf)
		if strings.Contains(DataUrl, ".pdf") || strings.Contains(DataUrl, ".PDF") {
			continue
		}

		go func(dataurl string, serviceurl string) {
			timeout := time.Duration(150 * time.Second)
			client := http.Client{
				Timeout: timeout,
			}
			res, err := client.Get(serviceurl)
			if err != nil {
				log.Fatal(err)
			}
			body, err := ioutil.ReadAll(res.Body)
			res.Body.Close()
			if err != nil {
				log.Fatal(err)
			}
			//fmt.Printf("%s\n", body)
			postDataToCouchDB(dataurl, setcontentdatabase, body, workers)
		}(DataUrl, ServiceUrl)
	}
	done <- true
}

func postDataToCouchDB(url string, setcontentdatabase string, data []byte, workers chan bool) {
	type JsonData struct {
		Content   string `json:"content"`
		Url       string `json:"url"`
		Timestamp string `json:"timestamp"`
	}
	currentTime := time.Now()
	jsonData := JsonData{string(data), url, currentTime.Format(time.RFC3339)}
	jsonSerialize, _ := json.Marshal(jsonData)
	fmt.Printf(string(jsonSerialize))
	//resp, _ := http.Post(setcontentdatabase, "application/json", bytes.NewBuffer(jsonSerialize))
	http.Post(setcontentdatabase, "application/json", bytes.NewBuffer(jsonSerialize))
	fmt.Println("-----------------------------------------")
	fmt.Println("WORKER: ", url)
	fmt.Println("_________________________________________")
	fmt.Printf("CONTENT:\n%s\n", string(data))
	fmt.Println("-----------------------------------------")
	fmt.Println("")
	//fmt.Println("HTTP POST => ", resp)
	<-workers
}

func main() {
	get_content_as_a_service := "http://localhost:6000/?url="
	set_content_into_couchdb := "http://localhost:5984/searchengine"
	filePath, skip_until_url := validateParams()
	chData := make(chan string)
	chUrl := make(chan string)
	done := make(chan bool)

	//postDataToCouchDB(set_content_into_couchdb, []byte("setting some data in couchdb"))

	go readBookmarkFile(filePath, skip_until_url, chData)
	go parseBookmarkData(chData, chUrl)
	go sendUrlToService(chUrl, get_content_as_a_service, set_content_into_couchdb, done)
	<-done
}
