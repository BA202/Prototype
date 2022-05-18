import json
import numpy as np

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

    dictOfEntriesByDate = {}
    dictOfKatsByDate = {}

    for key in dbData['data']['Reviews']:
        for keySen in dbData['data']['Reviews'][key]['Sentences']:
            for keyClass in dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications']:
                piChartData[dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Classification"]][0] += 1
                numberOfResults += 1

                if not dbData['data']['Reviews'][key]['CreationTime'] in dictOfEntriesByDate.keys():
                    dictOfEntriesByDate[dbData['data']['Reviews'][key]['CreationTime']] = {"Positive":0,'Negative':0,'Neutral':0}
                dictOfEntriesByDate[dbData['data']['Reviews'][key]['CreationTime']][dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Score"]] += 1




                if dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Score"] == "Positive":
                    piChartData[dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Classification"]][1] += 1
                elif dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Score"] == "Negative":
                    piChartData[dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Classification"]][2] += 1
                else:
                    piChartData[dbData['data']['Reviews'][key]['Sentences'][keySen]['Classifications'][keyClass]["Classification"]][3] += 1

    
    listOfDates = []
    positive =  []
    Negative =  []
    Neutral =  []

    for key in sorted(list(dictOfEntriesByDate.keys())):
        listOfDates.append(key)
        positive.append(dictOfEntriesByDate[key]['Positive'])
        Negative.append(dictOfEntriesByDate[key]['Negative'])
        Neutral.append(dictOfEntriesByDate[key]['Neutral'])

    dataView ={
        "PiChart":[
                    createPiChartData(piChartData)
                ]
        ,
        "LineChart":{
            "traces" : [
                    {
                    "x": listOfDates,
                    "y": positive,
                    'line': {'shape': 'line'},
                    'marker': {'color': '#73BF94','size': 5},
                    'mode': 'lines+markers',
                    'name': 'Positive'
                    },
                    {
                    "x": listOfDates,
                    "y": Negative,
                    'line': {'shape': 'line'},
                    'marker': {'color': '#DC505F','size': 5},
                    'mode': 'lines+markers',
                    'name': 'Negative'
                    },
                    {
                    "x": listOfDates,
                    "y": Neutral,
                    'line': {'shape': 'line'},
                    'marker': {'color': '#FFE782','size': 5},
                    'mode': 'lines+markers',
                    'name': 'Neutral'
                    }]
        },
        "LineChartKat":{
            "traces" : [
                    {
                    "x": [key for key in piChartData.keys() if piChartData[key][0]> 0 and piChartData[key][1]> 0],
                    "y": [piChartData[key][1] for key in piChartData.keys() if piChartData[key][0]> 0 and piChartData[key][1]> 0],
                    'name': 'Positive',
                    'type': 'bar',
                    'marker': {
                        'color': '#73BF94',
                        'opacity': 1
                    }
                    },
                    {
                    "x": [key for key in piChartData.keys() if piChartData[key][0]> 0 and piChartData[key][2]> 0],
                    "y": [piChartData[key][2] for key in piChartData.keys() if piChartData[key][0]> 0 and piChartData[key][2]> 0],
                    'name': 'Negative',
                    'type': 'bar',
                    'marker': {
                        'color': '#DC505F',
                        'opacity': 1
                    }
                    },
                    {
                    "x": [key for key in piChartData.keys() if piChartData[key][0]> 0 and piChartData[key][3]> 0],
                    "y": [piChartData[key][3] for key in piChartData.keys() if piChartData[key][0]> 0 and piChartData[key][3]> 0],
                    'name': 'Neutral',
                    'type': 'bar',
                    'marker': {
                        'color': '#FFE782',
                        'opacity': 1
                    }
                    }]
        },
        "TextBox":{
            "NumberOfSentences": numberOfResults
        },
        "SearchBox":{
            "Date": [2017,2023],
            "Category": ["Location","Room","Food","Staff","ReasonForStay", "GeneralUtility","HotelOrganisation"],
            "Score": ["Positive","Negative","Neutral"],
            "Language": ["German","English"],
            "Source": ["Booking","TripAdvisor","Google","Trivago","Expedia"],
            "Hotel": ["Arosa Kulm Hotel & Alpin Spa","Turmhotel Victoria Davos"]
        },
        "Overview":{
             "Total Results": [numberOfResults,{
        "Location":[piChartData['Location'][0],{'Positive': piChartData['Location'][1],'Negative':piChartData['Location'][2],'Neutral':piChartData['Location'][3]}],
        "Room":[piChartData['Room'][0],{'Positive': piChartData['Room'][1],'Negative':piChartData['Room'][2],'Neutral':piChartData['Room'][3]}],
        "Food":[piChartData['Food'][0],{'Positive': piChartData['Food'][1],'Negative':piChartData['Food'][2],'Neutral':piChartData['Food'][3]}],
        "Staff":[piChartData['Staff'][0],{'Positive': piChartData['Staff'][1],'Negative':piChartData['Staff'][2],'Neutral':piChartData['Staff'][3]}],
        "ReasonForStay":[piChartData['ReasonForStay'][0],{'Positive': piChartData['ReasonForStay'][1],'Negative':piChartData['ReasonForStay'][2],'Neutral':piChartData['ReasonForStay'][3]}],
        "GeneralUtility":[piChartData['GeneralUtility'][0],{'Positive': piChartData['GeneralUtility'][1],'Negative':piChartData['GeneralUtility'][2],'Neutral':piChartData['GeneralUtility'][3]}],
        "HotelOrganisation":[piChartData['HotelOrganisation'][0],{'Positive': piChartData['HotelOrganisation'][1],'Negative':piChartData['HotelOrganisation'][2],'Neutral':piChartData['HotelOrganisation'][3]}],
    }],
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