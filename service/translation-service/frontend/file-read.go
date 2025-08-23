package frontend

import (
	"errors"
	"react-scaffolding/service/translation-service/utils"
	"strings"

	"github.com/Serendipity-sw/gutil"
	"github.com/swgloomy/gutil/glog"
)

func readExcelFile(frontendDir, mergeFrontendDir string) (*[][]string, *[][]string, error) {
	filePathListIn, err := utils.ReadFileAll(frontendDir)
	if err != nil {
		glog.Error("frontend readExcelFile readFileAll run err! dirPath: %s err: %+v \n", frontendDir, err)
		return nil, nil, err
	}
	mergeFilePathListIn, err := utils.ReadFileAll(mergeFrontendDir)
	if err != nil {
		glog.Error("frontend readExcelFile readFileAll run err! mergeDirPath: %s err: %+v \n", mergeFrontendDir, err)
		return nil, nil, err
	}
	fileContentListIn, err := readExcel(filePathListIn)
	if err != nil {
		glog.Error("frontend readExcelFile readExcel run err! filePathList: %v err: %+v \n", *filePathListIn, err)
		return nil, nil, err
	}
	findDuplicate := dataDeduplication(fileContentListIn)
	if findDuplicate {
		glog.Error("frontend readExcelFile data duplicate item fileContentListIn \n")
		return nil, nil, errors.New("frontend readExcelFile data duplicate item fileContentListIn")
	}
	mergeFileContentListIn, err := readExcel(mergeFilePathListIn)
	if err != nil {
		glog.Error("frontend readExcelFile readExcel run err! mergeFilePathList: %v err: %+v \n", *mergeFilePathListIn)
		return nil, nil, err
	}
	glog.Info("frontend readExcelFile run success! \n")
	return fileContentListIn, mergeFileContentListIn, nil
}

func readExcel(filePathListIn *[]string) (*[][]string, error) {
	var (
		fileContentList [][]string
	)
	for _, filePath := range *filePathListIn {
		fileContentIn, err := gutil.ReadExcel(filePath)
		if err != nil {
			glog.Error("frontend readExcel ReadExcel run err! filePath: %s err: %+v \n", filePath, err)
			return nil, err
		}
		for _, contentList := range *fileContentIn {
			for _, list := range contentList {
				if len(list) > 1 && (strings.TrimSpace(list[0]) != "" || strings.TrimSpace(list[1]) != "") {
					fileContentList = append(fileContentList, list)
				}
			}
		}
	}
	glog.Info("frontend readExcel run success! \n")
	return &fileContentList, nil
}

func dataDeduplication(fileContentListIn *[][]string) bool {
	var (
		dataExits     = make(map[string]int)
		duplicateList []string
		ok            bool
		identifierStr string
	)
	for _, list := range *fileContentListIn {
		identifierStr = strings.TrimSpace(list[0])
		_, ok = dataExits[identifierStr]
		if !ok {
			dataExits[identifierStr] = 0
		} else {
			duplicateList = append(duplicateList, identifierStr)
		}
	}
	if len(duplicateList) > 0 {
		glog.Error("frontend dataDeduplication readExcel duplicate item duplicateList: %v \n", duplicateList)
		return true
	}
	glog.Info("frontend dataDeduplication run success! \n")
	return false
}
