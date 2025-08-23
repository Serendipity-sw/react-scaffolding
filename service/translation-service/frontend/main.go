package frontend

import (
	"encoding/json"
	"fmt"
	"os"
	clear_directory "react-scaffolding/service/translation-service/clear-directory"
	"react-scaffolding/service/translation-service/utils"

	"github.com/Serendipity-sw/gutil"
	"github.com/swgloomy/gutil/glog"
)

func Frontend(frontendDir, mergeFrontendDir, frontendJSONDir, frontendJsonFileName, writeDir string) {
	fileContentListIn, mergeFileContentListIn, err := readExcelFile(frontendDir, mergeFrontendDir)
	if err != nil {
		glog.Error("frontend Frontend readExcelFile run err! err: %+v \n", err)
		return
	}
	removeInvalidChars(fileContentListIn, mergeFileContentListIn)
	mergeData(fileContentListIn, mergeFileContentListIn)
	utils.EnglishCaseConversion(fileContentListIn, 2)
	err = clear_directory.ClearDirectory(frontendJSONDir)
	if err != nil {
		glog.Error("frontend Frontend clearDir frontendJSONDir: %s run err! err: %+v \n", frontendJSONDir, err)
		return
	}
	err = clear_directory.ClearDirectory(mergeFrontendDir)
	if err != nil {
		glog.Error("frontend Frontend clearDir mergeFrontendDir: %s run err! err: %+v \n", mergeFrontendDir, err)
		return
	}
	err = writeJsonToFile(fileContentListIn, frontendJSONDir, frontendJsonFileName)
	if err != nil {
		glog.Error("frontend Frontend writeJsonToFile run err! err: %+v \n", err)
		return
	}
	err = os.RemoveAll(writeDir)
	if err != nil {
		glog.Error("frontend RemoveAll err! writeDir: %s err: %+v \n", writeDir, err)
		return
	}
	writeLanguageJs(fileContentListIn, writeDir)
	glog.Info("frontend Frontend run success! \n")
}

func writeJsonToFile(fileContentListIn *[][]string, frontendJSONDir, frontendJsonFileName string) error {
	jsonStr, err := json.Marshal(*fileContentListIn)
	if err != nil {
		glog.Error("frontend writeJsonToFile run err! err: %+v \n", err)
		return err
	}
	var writeJson []byte
	writeJson = append(writeJson, []byte("module.exports = ")...)
	writeJson = append(writeJson, jsonStr...)
	saveFilePath := fmt.Sprintf("%s/%s", frontendJSONDir, frontendJsonFileName)
	err = gutil.FileCreateAndWrite(&writeJson, saveFilePath, false)
	if err != nil {
		glog.Error("frontend FileCreateAndWrite run err! saveFilePath: %s err: %+v \n", saveFilePath, err)
		return err
	}
	glog.Info("frontend writeJsonToFile run success! \n")
	return nil
}
