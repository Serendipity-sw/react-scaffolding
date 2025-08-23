package utils

import (
	"github.com/swgloomy/gutil/glog"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"strings"
)

func EnglishCaseConversion(fileContentListIn *[][]string, englishIndex int) {
	smallWords := map[string]bool{"to": true, "the": true, "and": true, "of": true, "or": true, "for": true, "in": true, "this": true, "that": true, "as": true, "is": true, "kWh": true, "at": true}
	for _, item := range *fileContentListIn {
		if len(item) < englishIndex+1 {
			continue
		}
		words := strings.Split(item[englishIndex], " ")
		for i, word := range words {
			if i != 0 && smallWords[strings.ToLower(word)] {
				words[i] = strings.ToLower(word)
				continue
			}
			if smallWords[strings.ToLower(word)] {
				words[i] = strings.ToLower(word)
				continue
			}
			if strings.ToUpper(word) == word {
				continue
			}
			if strings.Index(word, "{{") > -1 {
				continue
			}
			words[i] = cases.Title(language.English).String(word)
		}
		item[2] = strings.Join(words, " ")
	}
	glog.Info("frontend englishCaseConversion run success! \n")
}
