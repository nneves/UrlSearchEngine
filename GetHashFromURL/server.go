package main

import (
	"net/http"
	"os"
	"time"

	log "github.com/Sirupsen/logrus"
	"github.com/gorilla/mux"
)

func Check(err error) {
	if err != nil {
		panic(err)
	}
}

func GetVarsUrl(r *http.Request) string {
	vars := mux.Vars(r)
	url := vars["url"]
	return url
}

func StartHttpServer(listen string,
	HandlerGetHashFromURL func(w http.ResponseWriter, r *http.Request)) {

	pwd, err := os.Getwd()
	Check(err)
	dir := pwd + "/static"
	r := mux.NewRouter()

	// REST API
	r.HandleFunc("/api/hash/{url}", HandlerGetHashFromURL).Methods("GET")

	// Static files and assets
	r.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir(dir))))

	srv := &http.Server{
		Handler:      r,
		Addr:         listen,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
