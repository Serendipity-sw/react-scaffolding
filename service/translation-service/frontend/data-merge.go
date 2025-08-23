package frontend

import (
	"github.com/swgloomy/gutil/glog"
	"strings"
)

func mergeData(fileContentListIn, mergeFileContentListIn *[][]string) {
	if len(*mergeFileContentListIn) == 0 {
		glog.Info("frontend mergeData mergeFileContentList zero! \n")
		return
	}

	var (
		mergeDataMap  = make(map[string][]string)
		identifierStr string
		findOk        bool
		findItem      []string
	)
	for _, itemList := range *mergeFileContentListIn {
		identifierStr = strings.TrimSpace(itemList[0])
		if identifierStr != "" {
			mergeDataMap[identifierStr] = itemList
			continue
		}
		identifierStr = strings.TrimSpace(itemList[1])
		if identifierStr != "" {
			mergeDataMap[identifierStr] = itemList
		}
	}

	for _, list := range *fileContentListIn {
		findItem, findOk = mergeDataMap[strings.TrimSpace(list[0])]
		if !findOk {
			findItem, findOk = mergeDataMap[strings.TrimSpace(list[1])]
			if !findOk {
				continue
			}
		}
		for tranIndex, tranStr := range findItem {
			if tranIndex < 2 {
				continue
			}
			mergeStr := strings.TrimSpace(tranStr)
			if mergeStr != "" {
				if len(list) > tranIndex {
					list[tranIndex] = mergeStr
				} else {
					differenceValue := tranIndex - len(list)
					for i := 0; i < differenceValue; i++ {
						list = append(list, "")
					}
					list = append(list, mergeStr)
				}
			}
		}
	}
	glog.Info("frontend mergeData run success! \n")
}
