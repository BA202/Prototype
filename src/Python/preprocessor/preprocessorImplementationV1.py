import re

def cleanUp(review):
    """
            Cleans up the string for further processing

            Parameters
            ----------
            review: str

            Returns
            -------
            str

    """

    review = re.sub("  +",' ',review) #Remove Multiple Spaces
    review = re.sub("[^ -~]+|;|\)|#|\*",'',review) #Remove not printable characters
    review = re.sub("&", 'and',review)  # replace & with and
    review = re.sub("(!|\?)", '.', review) #Replace all ! and ? to .
    review = re.sub("(?<=[a-z])\.(?=[A-Z][a-z])|  +", '. ', review) #Add one space after a . at the end of a sentacne
    review = re.sub(" +\.", '.', review) #Remove spcaes before a point
    review = re.sub("\.\.\.\.+", '...', review)  # Remove excess points
    review = re.sub("<[^>]*>.*<\/[^>]*>", '', review) #remove HTML tags
    review = review.lower()
    return review


def splitInToParts(review):
    """
            Splits a clean review into different parts

            Parameters
            ----------
            review: str

            Returns
            -------
            list

    """

    listOfParts = review.split('.')
    return [sen for sen in listOfParts if len(sen) > 0]