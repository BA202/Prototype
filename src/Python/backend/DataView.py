import json


def createPiChartData(piChartData):
    ids =[]
    lables =[]
    parents =[]
    values =[]
    colors =[]

    for key in piChartData.keys():
        if piChartData[key][0] > 0:
            ids.append(key)
            lables.append(key)
            parents.append("")
            values.append(piChartData[key][0])
            colors.append(piChartData[key][4])

            ids.append(key+"-Positive")
            lables.append("Positive")
            parents.append(key)
            values.append(piChartData[key][1])
            colors.append("#73BF94")

            ids.append(key+"-Negative")
            lables.append("Negative")
            parents.append(key)
            values.append(piChartData[key][2])
            colors.append("#DC505F")

            ids.append(key+"-Neutral")
            lables.append("Neutral")
            parents.append(key)
            values.append(piChartData[key][3])
            colors.append("#FFE782")


    return{
                    'type': "sunburst",
                    'ids': ids,
                    'labels': lables,
                    'parents': parents,
                    'values':values,
                    'leaf': {'opacity': 0.8},
                    'marker': {'line': {'width': 1},
                    'colors':colors
                    },
                    "branchvalues": 'total'
                    }


def createDataView(dbData):
    piChartData = {
        "Location":[0,0,0,0,"#3C5454"],
        "Room":[0,0,0,0,"#387152"],
        "Food":[0,0,0,0,"#718774"],
        "Staff":[0,0,0,0,"#29799E"],
        "ReasonForStay":[0,0,0,0,"#7EBFBD"],
        "GeneralUtility":[0,0,0,0,"#DF9C4C"],
        "HotelOrganisation":[0,0,0,0,"#F5D995"],
    }

    numberOfResults = 0

    lineChartData = {

    }

    

    for key in dbData['data']['Reviews']:
        for keySen in dbData['data']['Reviews'][key]['Sentences']:
            for keyClass in dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications']:
                piChartData[dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Classification"]][0] += 1
                numberOfResults += 1

                if dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Score"] == "Positive":
                    piChartData[dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Classification"]][1] += 1
                elif dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Score"] == "Negative":
                    piChartData[dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Classification"]][2] += 1
                else:
                    piChartData[dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Classification"]][3] += 1


    

    dataView ={
        "PiChart":[
                    createPiChartData(piChartData)
                ]
        ,
        "LineChart":{
            "traces" : [
                    {
                    "x": [1, 2, 3, 4],
                    "y": [10, 4, 1, 0]
                    },
                    {
                    "x": [1, 2, 3, 4],
                    "y": [12, 9, 15, 12]
                    },
                    {
                    "x": [1, 2, 3, 4],
                    "y": [19, 12, 15, 16]
                    }]
        },
        "TextBox":{
            "NumberOfSentences": numberOfResults
        },
        "SearchBox":{
            "Date": [2021,2023],
            "Category": ["Location","Room","Food","Staff","ReasonForStay", "GeneralUtility","HotelOrganisation"],
            "Score": ["Positive","Negative"],
            "Language": ["German","English"],
            "Source": ["Trivago","Google","Online"]
        },
        "Overview":{
             "Overview": [numberOfResults]
        }
    } 
    return dataView


def createTextViewData(dbData, PageNumber):
    textData = []
    for key in dbData['data']['Reviews']:
        for keySen in dbData['data']['Reviews'][key]['Sentences']:
            for keyClass in dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications']:
                textData.append(
                    {
                "Sentence": dbData['data']['Reviews'][key]['Sentences'][keySen]['Sentence'],
                "ParrentReview": dbData['data']['Reviews'][key]['RawReview'],
                "Score": dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Score"],
                "Classification": dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Classification"],
                "Platform": dbData['data']['Reviews'][key]['Source'],
                "Language": dbData['data']['Reviews'][key]['Language'],
            }
                )
    dataView = {
        "Data": textData[(PageNumber-1)*7:(PageNumber)*7]
    }

    return dataView