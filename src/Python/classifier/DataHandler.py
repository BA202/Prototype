import requests
import json
import random

class DataHandler:

    def __init__(self,folderPath = "", lan="English"):
        """
        Depending on the optional parameter folderPath the data will be loaded localy or from the central server.\n

        folderPath not specified ("")   -> loads the data from the central server
        folderPath specified            -> loads the data from the local file system

        Parameters
        ----------
        folderPath
            specifies the location of the folder containing the three .tsv files
        """
        self.__folderPath = folderPath
        self.__lan = lan
        self.__possibleCats = ["Location","Room","Food","Staff","ReasonForStay", "GeneralUtility","HotelOrganisation", "Unknown"]


    def getScoreData(self, balanceDataset = False):
        """
         Returns a dataset containing all sentences and corresponsing Score/Sentiment.

         Indepented from where the data is loaded the 2D list is the same.

         Parameters
         ----------
         none

         Returns
         -------
         list
            [[String, String]]

         Examples
         --------
         >>> self.getScoreData()
         [['The premises are very peaceful and well maintained.', 'Positiv'],...]
         """
        scoreData = []
        if len(self.__folderPath) == 0:
            response = self.__getDataFromServer()
            reviews = response['data']['Reviews']
            for revKey in reviews.keys():
                sentences = reviews[revKey]['Sentences']
                for senKey in sentences.keys():
                    classifications = sentences[senKey]['Classifications']
                    scoreData.append([sentences[senKey]['Sentence'],classifications[list(classifications.keys())[0]]["Score"]])
        else:
            listOfSen,DictOfClass = self.__getDataFromFiles()
            for sentence,i in zip(listOfSen, range(len(listOfSen))):
                scoreData.append([sentence,DictOfClass[i+1][0][0]])

        if balanceDataset:
            return self.balanceDataSet(scoreData)
        else:
            return scoreData

    def getContentTypeData(self,balanceDataset = False):
        """
         Returns a dataset containing all sentences and corresponsing ContentType.

         Indepented from where the data is loaded the 2D list is the same.

         Parameters
         ----------
         none

         Returns
         -------
         list
            [[String, String]]

         Examples
         --------
         >>> self.getContentTypeData()
         [['Really a moment never to forget', 'Story'],...]
         """
        contentTypeData = []
        if len(self.__folderPath) == 0:
            response = self.__getDataFromServer()
            reviews = response['data']['Reviews']
            for revKey in reviews.keys():
                sentences = reviews[revKey]['Sentences']
                for senKey in sentences.keys():
                    classifications = sentences[senKey]['Classifications']
                    contentTypeData.append([sentences[senKey]['Sentence'],
                                      classifications[list(classifications.keys())[0]]["ContentType"]])
        else:
            listOfSen,DictOfClass = self.__getDataFromFiles()
            for sentence,i in zip(listOfSen, range(len(listOfSen))):
                contentTypeData.append([sentence,DictOfClass[i+1][0][2]])
        if balanceDataset:
            return self.balanceDataSet(contentTypeData)
        else:
            return contentTypeData


    def getCategorieData(self,cat, balanceDataset = False):
        """
          Returns a dataset containing all sentences and corresponsing categorie.

          Indepented from where the data is loaded the 2D list is the same.

          When the cat specified does not correspond to a valid categorie the
          function will just return the first categorie and print a warning.

          Parameters
          ----------
          cat : string
            defines which categorie will be prioritised in the case of multiple categories.

          Returns
          -------
          list
             [[String, String]]

          Examples
          --------
          >>> self.getCategorieData('Staff')
          [['Spotlessly clean and very spacious.', 'Staff'],...]
          >>> self.getCategorieData('hallo')
          This Categorie does not exists
          [['Spotlessly clean and very spacious.', 'Staff'],...]
          """
        if cat not in self.__possibleCats:
            print("----\u001b[1m\u001b[31;1mThis Categorie does not exists\u001b[0m\n----will return only the first Categorie, may case unwanted results\u001b[0m")
        categorieData = []
        if len(self.__folderPath) == 0:
            response = self.__getDataFromServer()
            reviews = response['data']['Reviews']
            for revKey in reviews.keys():
                sentences = reviews[revKey]['Sentences']
                for senKey in sentences.keys():
                    classifications = sentences[senKey]['Classifications']
                    listOfPossibleClassification = []
                    for classificationKey in classifications.keys():
                        listOfPossibleClassification.append(classifications[classificationKey]["Classification"])

                    if cat in listOfPossibleClassification :
                        categorieData.append([sentences[senKey]['Sentence'],cat])
                    else:
                        categorieData.append([sentences[senKey]['Sentence'], listOfPossibleClassification[0]])
        else:
            listOfSen,DictOfClass = self.__getDataFromFiles()
            for sentence,i in zip(listOfSen, range(len(listOfSen))):
                listOfPossibleClassification = []
                for classification in DictOfClass[i+1]:
                    listOfPossibleClassification.append(classification[1])
                if cat in listOfPossibleClassification:
                    categorieData.append([sentence,cat])
                else:
                    categorieData.append([sentence,listOfPossibleClassification[0]])
        if balanceDataset:
            return self.balanceDataSet(categorieData)
        else:
            return categorieData


    def __getDataFromServer(self):
        url = f"http://152.96.24.231:81/backend/getAllTraningData?lan={self.__lan}"
        response = requests.request("GET", url)
        return json.loads(response.text)


    def __getDataFromFiles(self):
        firstIndex = None
        sentencesAsList = []
        with open(self.__folderPath +"/ReviewSentences.tsv", encoding='utf-8') as sentencesFile:
            sentencesAsList = [sen.split('\t')[0] for sen in sentencesFile.read().split('\n')]

        classificationAsDict = {}
        with open(self.__folderPath +"/ClassificationResult.tsv", encoding='utf-8')as classificationFile:
            for  classification in classificationFile.read().split('\n'):
                classificationsInLine = classification.split('\t')
                if firstIndex == None:
                    firstIndex = int(classificationsInLine[6])
                if (int(classificationsInLine[6])-firstIndex+1) in classificationAsDict.keys():
                    classificationAsDict[(int(classificationsInLine[6])-firstIndex+1)].append([classificationsInLine[0],classificationsInLine[2],classificationsInLine[4]])
                else:
                    classificationAsDict[(int(classificationsInLine[6])-firstIndex+1)] = [[classificationsInLine[0],classificationsInLine[2],classificationsInLine[4]]]

        return (sentencesAsList,classificationAsDict)

    @staticmethod
    def balanceDataSet(dataSet, seed = 100):
        random.seed(seed)
        balancedDataset = dataSet
        dataCount = {data[1]: 0 for data in dataSet}
        dataSortedByCat = {data[1]: [] for data in dataSet}
        for data in dataSet:
            dataCount[data[1]] += 1
            dataSortedByCat[data[1]].append([data[0],data[1]])

        numberOfMaxSampels = 0
        for key in dataCount.keys():
            if numberOfMaxSampels <= dataCount[key]:
                numberOfMaxSampels = dataCount[key]

        for key in dataCount.keys():
            for i in range(numberOfMaxSampels-dataCount[key]):
                balancedDataset.append(dataSortedByCat[key][random.randint(0,len(dataSortedByCat[key])-1)])

        return balancedDataset
