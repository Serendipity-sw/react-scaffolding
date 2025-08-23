package utils

import (
	"fmt"
	"github.com/Serendipity-sw/gutil"
	"github.com/swgloomy/gutil/glog"
)

func ReadFileAll(fileDir string) (*[]string, error) {
	fileListIn, err := gutil.GetMyAllFileByDir(fileDir)
	if err != nil {
		glog.Error("utils ReadFileAll GetMyAllFileByDir run err! dir: %s err: %+v \n", fileDir, err)
		return nil, err
	}
	var (
		filePathList []string
	)
	for _, value := range *fileListIn {
		filePathList = append(filePathList, fmt.Sprintf("%s/%s", fileDir, value))
	}
	glog.Info("utils ReadFileAll run success! filePathList: %v \n", filePathList)
	return &filePathList, nil
}
