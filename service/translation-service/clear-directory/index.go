package clear_directory

import (
	"github.com/swgloomy/gutil/glog"
	"os"
)

func ClearDirectory(dirPath string) error {
	entries, err := os.ReadDir(dirPath)
	if err != nil {
		glog.Error("clear_directory ClearDirectory read dir err! dirPath: %s err: %+v \n", dirPath, err)
		return err
	}

	for _, entry := range entries {
		entryPath := dirPath + "/" + entry.Name()

		if entry.IsDir() {
			err := os.RemoveAll(entryPath)
			if err != nil {
				glog.Error("clear_directory ClearDirectory remove dir err! entryPath: %s err: %+v \n", entryPath, err)
				return err
			}
		} else {
			err := os.Remove(entryPath)
			if err != nil {
				glog.Error("clear_directory ClearDirectory remove file err! entryPath: %s err: %+v \n", entryPath, err)
				return err
			}
		}
	}
	glog.Info("clear_directory ClearDirectory run success! dirPath: %s \n", dirPath)
	return nil
}
