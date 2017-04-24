package main

import (
	"bufio"
	"bytes"
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

func readBookmarkFile(filePath string, skipUntilURL string, chData chan string) {
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	sendData := true
	if len(skipUntilURL) > 0 {
		sendData = false
	}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		if len(skipUntilURL) > 0 && strings.Contains(scanner.Text(), skipUntilURL) {
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

func parseBookmarkData(chData chan string, chURL chan string) {
	re := regexp.MustCompile(`(HREF=)(.*)(ADD_DATE)`)
	for dataline := range chData {
		for _, match := range re.FindAllString(dataline, -1) {
			url := strings.Split(match, "\"")
			chURL <- url[1]
		}
	}
	close(chURL)
}

func sendURLToService(chURL chan string, dbproxy string, done chan bool) {
	for dataurl := range chURL {
		// check for unsupported urls (.pdf)
		if strings.Contains(dataurl, ".pdf") || strings.Contains(dataurl, ".PDF") {
			continue
		}

		fmt.Println("------------------------------------------")
		fmt.Println("DBProxy => ", dbproxy)
		fmt.Println("URL => ", dataurl)

		url := dbproxy
		var str = []byte(`url=` + dataurl)
		req, err := http.NewRequest("POST", url, bytes.NewBuffer(str))
		if err != nil {
			panic(err)
		}
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

		requestTimeout := time.Duration(150 * time.Second)
		client := &http.Client{
			Timeout: requestTimeout,
		}
		resp, err := client.Do(req)
		if err != nil {
			//panic(err)
			fmt.Println("URL=", dataurl, " ERROR: ", err)
			continue
		}
		defer resp.Body.Close()

		fmt.Println("response Status:", resp.Status)
		fmt.Println("response Headers:", resp.Header)
		body, _ := ioutil.ReadAll(resp.Body)
		fmt.Println("response Body:", string(body))
		fmt.Println("------------------------------------------")
		fmt.Println("")
	}
	done <- true
}

func main() {
	dbproxy := "http://localhost:8000/url"
	filePath, jumpToURL := validateParams()
	chData := make(chan string)
	chURL := make(chan string)
	done := make(chan bool)

	go readBookmarkFile(filePath, jumpToURL, chData)
	go parseBookmarkData(chData, chURL)
	go sendURLToService(chURL, dbproxy, done)
	<-done
}
