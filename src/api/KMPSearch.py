from .data import data
import threading

def KMPSearch(text):
    findData = []
    KMPBorder = KMPBorderFunction(text)

    def KMPAlgorithm(teks, pattern=text) -> bool:
        j = 0
        i = 0
        lenPattern = len(pattern)
        lenText = len(teks)
        while i < lenText:
            if teks[i].lower() == pattern[j].lower():
                i += 1
                j += 1
                if j == lenPattern:
                    return True
            else:
                if j != 0:
                    j = KMPBorder[j - 1]
                else:
                    i += 1
        return False

    def search_data(chapter, section, ayat=None):
        if ayat is not None and KMPAlgorithm(ayat[1]):
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


def KMPBorderFunction(text) -> list[int]:
    KMPBorder = [0] * (len(text) - 1)
    for i in range(len(text) - 1):
        for j in range(i - 1, 0, -1):
            if text[:j] == text[i - j:i]:
                KMPBorder[i] = j
                break
    return KMPBorder


if __name__ == "__main__":
    KMPSearch("saudara perempuan")