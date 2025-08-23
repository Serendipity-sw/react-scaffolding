package main

import (
	"bufio"
	"flag"
	"fmt"
	"os"
	config_util "react-scaffolding/service/translation-service/config-util"
	"react-scaffolding/service/translation-service/frontend"
	"react-scaffolding/service/translation-service/store"
	"strings"

	"github.com/Serendipity-sw/gutil"
	"github.com/guotie/config"
	"github.com/guotie/deferinit"
	"github.com/swgloomy/gutil/glog"
)

var (
	debugFlag = flag.Bool("d", false, "debug mode")
	configFn  = flag.String("config", "./config.json", "config file path")
)

func main() {
	flag.Parse()

	err := config.ReadCfg(*configFn)
	if err != nil {
		fmt.Printf("main ReadCfg read err! filePath: %s err: %+v \n", *configFn, err.Error())
		return
	}
	config_util.Init()

	serverRun(*debugFlag)

	reader := bufio.NewReader(os.Stdin)

	input, err := waitInput(reader)
	if err != nil {
		glog.Error("main waitInput run err! err: %+v \n", err)
		goto exitLine
	}

	if input == "end" {
		goto exitLine
	}

	if input == "" {
		frontend.Frontend(store.FrontendDir, store.MergeFrontendDir, store.FrontendJSONDir, store.FrontendJsonFileName, store.FrontendWriteDir)
	}

	goto exitLine

exitLine:
	serverExit()
}

func waitInput(reader *bufio.Reader) (string, error) {
	fmt.Print("please input: ")
	input, err := reader.ReadString('\n')
	if err != nil {
		fmt.Println("read input err: ", err)
		return "", err
	}
	input = strings.TrimSpace(input)
	return input, nil
}

func serverRun(debug bool) {
	gutil.LogInit(debug, store.LogsDir)

	gutil.SetCPUUseNumber(0)
	fmt.Println("set many cpu successfully!")

	deferinit.InitAll()
	fmt.Println("init all module successfully!")

	deferinit.RunRoutines()
	fmt.Println("init all run successfully!")
}

func serverExit() {
	deferinit.StopRoutines()
	fmt.Println("stop routine successfully!")

	deferinit.FiniAll()
	fmt.Println("stop all modules successfully!")

	glog.Close()

	os.Exit(0)
}
