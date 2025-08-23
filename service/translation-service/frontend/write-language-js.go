package frontend

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"react-scaffolding/service/translation-service/store"
	"strings"

	"github.com/Serendipity-sw/gutil"
	"github.com/swgloomy/gutil/glog"
)

func writeLanguageJs(fileContentListIn *[][]string, writeDir string) {
	var (
		languageList []map[string][]map[string]string
		aliasSplit   []string
	)
	for i := 0; i < len(store.TranslationSort); i++ {
		languageList = append(languageList, make(map[string][]map[string]string))
	}
	for _, list := range *fileContentListIn {
		for index, value := range list {
			if index == 0 {
				aliasSplit = strings.Split(value, ".")
			} else {
				translationDataWrite(aliasSplit, value, store.TranslationSort[index-1], writeDir, &languageList[index-1])
			}
		}
	}

	for _, tranObj := range languageList {
		languageFileImportDetermine(&tranObj, writeDir)
	}

	for _, objMap := range languageList {
		for filePath, contentList := range objMap {
			dirPathList := strings.Split(filePath, "/")
			err := os.MkdirAll(strings.Join(dirPathList[:len(dirPathList)-1], "/"), os.ModePerm)
			if err != nil {
				glog.Error("frontend writeLanguageJs run err! filePath: %s err: %+v \n", filePath, err)
				return
			}
			var (
				byteContent  []byte
				mergeContent = make(map[string]string)
			)
			for key, value := range contentList[0] {
				mergeContent[key] = value
			}
			if len(contentList) > 1 {
				var (
					importContentByte  []byte
					importStrSplitList []string
				)
				for key, value := range contentList[1] {
					importContentByte = append(importContentByte, []byte(fmt.Sprintf("import %s from '%s' \r\n", key, value))...)
					importStrSplitList = strings.Split(key, "")
					mergeContent[fmt.Sprintf("%s%s", strings.ToLower(importStrSplitList[0]), strings.Join(importStrSplitList[1:], ""))] = key
				}
				if len(importContentByte) > 0 {
					byteContent = append(byteContent, importContentByte...)
				}
			}
			byteList, err := json.Marshal(mergeContent)
			if err != nil {
				glog.Error("frontend writeLanguageJs run err! contentList: %+v err: %+v \n", contentList, err)
				return
			}
			byteContent = append(byteContent, []byte("export default ")...)
			byteContent = append(byteContent, byteList...)
			if len(contentList) > 1 {
				var (
					matchIndex           int
					matchValueByteLength int
					matchValueSplitList  []string
				)
				for matchValue := range contentList[1] {
					matchValueByteLength = len([]byte(matchValue))
					matchValueSplitList = strings.Split(matchValue, "")
					matchIndex = bytes.LastIndex(byteContent, []byte(fmt.Sprintf("\"%s\":\"%s\"", fmt.Sprintf("%s%s", strings.ToLower(matchValueSplitList[0]), strings.Join(matchValueSplitList[1:], "")), matchValue))) + 1 + matchValueByteLength + 2
					byteContent = append(byteContent[:matchIndex], byteContent[matchIndex+1:]...)
					matchIndex += len([]byte(matchValue))
					byteContent = append(byteContent[:matchIndex], byteContent[matchIndex+1:]...)
				}
			}
			err = gutil.FileCreateAndWrite(&byteContent, filePath, false)
			if err != nil {
				glog.Error("frontend writeLanguageJs FileCreateAndWrite run err! byteList: %s filePath: %s err: %+v \n", string(byteList), filePath, err)
				return
			}
		}
	}
}

func translationDataWrite(aliasSplit []string, tranValue, dirPre, writeDir string, tranObj *map[string][]map[string]string) {
	var (
		findList []map[string]string
		exits    bool
		filePath string
		key      = aliasSplit[len(aliasSplit)-1]
		value    = tranValue
	)
	if len(aliasSplit) == 1 {
		filePath = fmt.Sprintf("%s/%s/index.js", writeDir, dirPre)
	} else {
		filePath = fmt.Sprintf("%s/%s/%s/index.js", writeDir, dirPre, strings.Join(aliasSplit[:len(aliasSplit)-1], "/"))
	}
	findList, exits = (*tranObj)[filePath]
	if !exits {
		(*tranObj)[filePath] = append((*tranObj)[filePath], map[string]string{
			key: value,
		})
	} else {
		findList[0][key] = value
	}
}

func languageFileImportDetermine(tranObjIn *map[string][]map[string]string, writeDir string) {
	var (
		importMap            = make(map[string]map[string]string)
		dirFilePathSplitList []string
		findMap              map[string]string
		findOk               bool
		findKey              string
		importKeySplit       []string
		writeDirSplitList    = strings.Split(writeDir, "/")
	)
	for dirFilePath := range *tranObjIn {
		dirFilePathSplitList = strings.Split(dirFilePath, "/")
		if len(dirFilePathSplitList) > len(writeDirSplitList)+2 {

			forLabelList := dirFilePathSplitList[len(writeDirSplitList) : len(dirFilePathSplitList)-1]

			for index := range forLabelList {
				findKey = fmt.Sprintf("%s/%s/index.js", writeDir, strings.Join(forLabelList[:index], "/"))
				findMap, findOk = importMap[findKey]
				if !findOk {
					importMap[findKey] = make(map[string]string)
					findMap = importMap[findKey]
				}
				importKeySplit = strings.Split(forLabelList[index], "")
				findMap[fmt.Sprintf("%s%s", strings.ToUpper(importKeySplit[0]), strings.Join(importKeySplit[1:], ""))] = fmt.Sprintf("./%s", forLabelList[index])
			}

		}
	}

	tranObj := *tranObjIn

	for key, importMap := range importMap {
		if len(tranObj[key]) == 0 {
			tranObj[key] = append(tranObj[key], make(map[string]string))
		}
		if len(tranObj[key]) == 1 {
			tranObj[key] = append(tranObj[key], make(map[string]string))
		}
		for importKey, value := range importMap {
			tranObj[key][1][importKey] = value
		}
	}
}
