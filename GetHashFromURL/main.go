package main

import (
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"net/http"
)

// Go implements several hash functions in various
// `crypto/*` packages.

func generateHashFromURL(url string) []byte {
	// The pattern for generating a hash is `sha1.New()`,
	// `sha1.Write(bytes)`, then `sha1.Sum([]byte{})`.
	// Here we start with a new hash.
	h := sha1.New()

	// `Write` expects bytes. If you have a string `s`,
	// use `[]byte(s)` to coerce it to bytes.
	h.Write([]byte(url))

	// This gets the finalized hash result as a byte
	// slice. The argument to `Sum` can be used to append
	// to an existing byte slice: it usually isn't needed.
	bs := h.Sum(nil)

	// SHA1 values are often printed in hex, for example
	// in git commits. Use the `%x` format verb to convert
	// a hash results to a hex string.
	fmt.Println(url)
	fmt.Printf("%x\n", bs)
	return bs
}

func main() {
	listen := ":8000"
	/*
		s := "sha1 this string"

		// The pattern for generating a hash is `sha1.New()`,
		// `sha1.Write(bytes)`, then `sha1.Sum([]byte{})`.
		// Here we start with a new hash.
		h := sha1.New()

		// `Write` expects bytes. If you have a string `s`,
		// use `[]byte(s)` to coerce it to bytes.
		h.Write([]byte(s))

		// This gets the finalized hash result as a byte
		// slice. The argument to `Sum` can be used to append
		// to an existing byte slice: it usually isn't needed.
		bs := h.Sum(nil)

		// SHA1 values are often printed in hex, for example
		// in git commits. Use the `%x` format verb to convert
		// a hash results to a hex string.
		fmt.Println(s)
		fmt.Printf("%x\n", bs)
	*/

	// http callback function handler for Request History
	// $ http 127.0.0.1:8888/api/hash/{url}
	HandlerGetHashFromURL := func(w http.ResponseWriter, r *http.Request) {
		url := GetVarsUrl(r)
		sha1 := generateHashFromURL(url)
		hashHex := hex.EncodeToString(sha1)
		w.Header().Set("Content-Type", "text/plain")
		//w.Header().Set("Content-Type", "application/octet-stream")
		w.Write([]byte(hashHex))
	}
	StartHttpServer(listen, HandlerGetHashFromURL)
}
