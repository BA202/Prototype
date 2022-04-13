import json

def createDataView(dbData):
    dataView ={
        "PiChart":{
            "labels": [],
            "parents": [],
            "values":[]
        },
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
            "NumberOfSentences": 15
        },
        "SearchBox":{
            "Date": [2021,2023],
            "Category": ["Location","Room","Food","Staff","ReasonForStay", "GeneralUtility","HotelOrganisation"],
            "Sentiment": ["Positive","Negative"],
            "Langage": ["German","English"],
            "Platform": ["Trivago","Google"]
        },
        "Overview":{
             "Test": 15
        }
    } 
    return dataView


def createTextViewData(dbData, start, end):
    dataView = {
        "Data": [
            {
                "Sentence": "This a sentence.",
                "ParrentReview": "I am the original review",
                "Score": "Positive",
                "Classification": "Location",
                "Platform": "Trivago",
                "Language": "English",
            }
        ]
    }

    return dataView