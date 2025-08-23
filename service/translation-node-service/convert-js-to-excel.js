const serviceConfig = require('../translation-service/config.json')
require(
  `../translation-service/${serviceConfig.exportDir}/${serviceConfig.frontendJsonFileName}`
)
const fs = require('fs')
const xlsx = require('xlsx')
const dayjs = require('dayjs')

let translationKeysList = serviceConfig.translationSort

const dataLoadLanguageList = (aliasList, languageObj, languageList) => {
  let list = []
  translationKeysList.forEach(languageKey => {
    let cloneItem = structuredClone(languageObj[languageKey])
    aliasList.forEach(key => {
      try {
        cloneItem = cloneItem[key]
      } catch (e) {
        console.log(cloneItem, key, aliasList, languageKey)
        throw e
      }
    })
    list.push(cloneItem)
  })
  languageList.push([aliasList.join('.'), ...list])
}

const traverseObject = (obj, list, languageObj, languageList) => {
  for (const [key, value] of Object.entries(obj)) {
    const languageAliasList = [...list, key]
    if (typeof value === 'string') {
      dataLoadLanguageList(languageAliasList, languageObj, languageList)
    } else {
      traverseObject(value, languageAliasList, languageObj, languageList)
    }
  }
}

const emptyDir = filePath => {
  const files = fs.readdirSync(filePath) //读取该文件夹
  files.forEach(file => {
    const nextFilePath = `${filePath}/${file}`
    const states = fs.statSync(nextFilePath)
    if (states.isDirectory()) {
      emptyDir(nextFilePath)
    } else {
      fs.unlinkSync(nextFilePath)
      console.log(`删除文件 ${nextFilePath} 成功`)
    }
  })
}

const convertToExcel = (languageObj, exportDir) => {
  let languageList = []
  for (const [key, value] of Object.entries(languageObj.cn)) {
    const languageAlias = [key]
    if (typeof value === 'string') {
      dataLoadLanguageList(languageAlias, languageObj, languageList)
    } else {
      traverseObject(value, languageAlias, languageObj, languageList)
    }
  }
  const folderName = `./service/translation-service/${exportDir}`
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }

  emptyDir(folderName)

  const aoaData = []
  languageList.forEach(list => {
    const modal = [list[0]]
    translationKeysList.forEach((languageKey, index) => {
      modal.push(list[index + 1])
    })
    aoaData.push(modal)
  })

  const worksheet = xlsx.utils.aoa_to_sheet(aoaData)

  const workBook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workBook, worksheet, 'sheet1')

  xlsx.writeFile(workBook, `${folderName}/${dayjs().unix()}.xlsx`)
}

convertToExcel(
  global[serviceConfig.frontendVariable],
  serviceConfig.frontendDir
)
