package config_util

import (
	"encoding/json"
	"fmt"
	"os"
	"react-scaffolding/service/translation-service/store"

	"github.com/guotie/config"
)

func Init() {
	store.LogsDir = config.GetString("logsDir")
	_, err := os.Stat(store.LogsDir)
	dirExisted := err == nil || os.IsExist(err)
	if !dirExisted {
		err = os.Mkdir(store.LogsDir, os.ModePerm)
		if err != nil {
			fmt.Printf("config_util mkdir run err! logsDir: %s err: %+v \n", store.LogsDir, err)
		}
	}

	store.FrontendDir = config.GetString("frontendDir")
	_, err = os.Stat(store.FrontendDir)
	dirExisted = err == nil || os.IsExist(err)
	if !dirExisted {
		err = os.Mkdir(store.FrontendDir, os.ModePerm)
		if err != nil {
			fmt.Printf("config_util mkdir run err! frontendDir: %s err: %+v \n", store.FrontendDir, err)
		}
	}

	store.MergeFrontendDir = config.GetString("mergeFrontendDir")
	_, err = os.Stat(store.MergeFrontendDir)
	dirExisted = err == nil || os.IsExist(err)
	if !dirExisted {
		err = os.Mkdir(store.MergeFrontendDir, os.ModePerm)
		if err != nil {
			fmt.Printf("config_util mkdir run err! mergeFrontendDir: %s err: %+v \n", store.MergeFrontendDir, err)
		}
	}

	store.FrontendJSONDir = config.GetString("frontendJsonDir")
	_, err = os.Stat(store.FrontendJSONDir)
	dirExisted = err == nil || os.IsExist(err)
	if !dirExisted {
		err = os.Mkdir(store.FrontendJSONDir, os.ModePerm)
		if err != nil {
			fmt.Printf("config_util mkdir run err! frontendJsonDir: %s err: %+v \n", store.FrontendJSONDir, err)
		}
	}

	store.FrontendJsonFileName = config.GetString("frontendJsonFileName")

	store.MergeDir = config.GetString("mergeDir")
	_, err = os.Stat(store.MergeDir)
	dirExisted = err == nil || os.IsExist(err)
	if !dirExisted {
		err = os.Mkdir(store.MergeDir, os.ModePerm)
		if err != nil {
			fmt.Printf("config_util mkdir run err! mergeDir: %s err: %+v \n", store.MergeDir, err)
		}
	}

	store.FrontendWriteDir = config.GetString("frontendWriteDir")

	translationSortByte, _ := json.Marshal(config.Get("translationSort"))

	err = json.Unmarshal(translationSortByte, &store.TranslationSort)
	if err != nil {
		fmt.Printf("config_util Unmarshal translationSortByte run err! translationSortByte: %s err: %+v \n", string(translationSortByte), err)
	}
}
