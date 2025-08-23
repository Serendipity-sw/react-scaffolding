package frontend

import (
	"github.com/swgloomy/gutil/glog"
	"strings"
)

func removeInvalidChars(fileContentListIn, mergeFileContentListIn *[][]string) {
	invalidCharsList := []string{
		"​",
	}
	for _, list := range *fileContentListIn {
		for i, value := range list {
			for _, removeStr := range invalidCharsList {
				list[i] = strings.ReplaceAll(value, removeStr, "")
			}
		}
	}

	for _, list := range *mergeFileContentListIn {
		for i, value := range list {
			for _, removeStr := range invalidCharsList {
				list[i] = strings.ReplaceAll(value, removeStr, "")
			}
		}
	}

	glog.Info("remove invalid chars success")
}
