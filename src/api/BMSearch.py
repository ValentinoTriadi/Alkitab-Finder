from .data import data
import threading

def BMSearch(text):
    findData = []
    LastOccurrence = LastOccurrenceFunction(text)

    def BMAlgorithm(teks, pattern=text) -> bool:
        lenPattern = len(pattern)
        lenText = len(teks)
        j = lenPattern - 1
        i = lenPattern - 1
        while i < lenText:
            if teks[i].lower() == pattern[j].lower():
                if j == 0:
                    return True
                else:
                    i -= 1
                    j -= 1
            else:
                LO = LastOccurrence[teks[i]] if teks[i] in LastOccurrence else -1
                i += lenPattern - min(j, 1 + LO)
                j = lenPattern - 1

    def search_data(chapter, section = None, ayat=None):
        if ayat is not None and BMAlgorithm(ayat[1]):
            tempData = {
                "chapter": chapter,
                "section": section,
                "ayat": ayat[0],
                "text": ayat[1]
            }
            findData.append(tempData)

    threads = []
    for chapter in data:
        for section in data[chapter]:
            for ayat in data[chapter][section]:
                t = threading.Thread(target=search_data, args=(chapter, section, (ayat, data[chapter][section][ayat])))
                threads.append(t)
                t.start()

    for t in threads:
        t.join()

    return findData


def LastOccurrenceFunction(pattern) -> dict:
    lastOccurrence = {}
    for i in range(len(pattern)):
        lastOccurrence[pattern[i]] = i
    return lastOccurrence


if __name__ == "__main__":
    BMSearch("saudara perempuan")