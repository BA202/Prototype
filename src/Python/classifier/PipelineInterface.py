from transformers import pipeline

class PipelineInterface:

    def __init__(self,ModelName):
        self.__pipe = pipeline(task= 'text-classification',model = ModelName)

    def classify(self,sentence):
        res = self.__pipe(sentence)
        return res[0]['label'],res[0]['score']

if __name__ == '__main__':
    myClass = PipelineInterface("bert-base-german-cased_German_sentiment")
    print(myClass.classify("Das Essen war ungeniesbar"))