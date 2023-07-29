const quoteURL = "https://api.quotable.io/random"
const wpm = document.getElementById("wpm")
const wordDisplay = document.getElementById("word-display")
const wordInput = document.getElementById("input-word")
const Timer = document.getElementById("timer")
let wordsQuoteList
let TotalWordsRight = 0
let tempWordRight = 0
let wordRight = 0
let time = 60
let WordsPerMinute
let finished


wordInput.addEventListener('input', () => {
    const arrayQuote = wordDisplay.querySelectorAll('span')
    const arrayInput = wordInput.value.split('')
    const wordsInput = wordInput.value.split(' ')
    finished = true

    wordsInput.forEach((word, index) => {
        if (word === wordsQuoteList[index]){
            wordRight++
        }
    })
    tempWordRight = wordRight
    wordRight = 0
    
    // TO SHOW TOTAL WORDS RIGHT USE WORDSRIGHT + TOTALWORDSTIGHT
    

    if (wordInput.value.length === arrayQuote.length){
        getQuote()
        wordInput.value = ''
        TotalWordsRight += tempWordRight
    }

    arrayQuote.forEach((charSpan, index) => {
        const char = arrayInput[index]     
        
        if (char == null){
            charSpan.classList.remove('incorrect')
            charSpan.classList.remove('correct')
        }
        else if (char === charSpan.innerText){
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
        } else {
            charSpan.classList.add('incorrect')
            charSpan.classList.remove('correct')
        }
        
    })
})

function getRandomQuote(){
    return fetch(quoteURL).then(
        response => response.json()
    ).then(
        data => data.content
    )
}

async function getQuote(){
    const quote = await getRandomQuote()
    wordDisplay.innerHTML = ''
    
    quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        wordDisplay.appendChild(charSpan)
    })

    wordsQuoteList = quote.split(" ")
}

function start_timer(){
    let interval_time = setInterval(() => {
        Timer.innerHTML = time
        if (time > 0){
            time--
            WordsPerMinute = Math.round((60*(tempWordRight + TotalWordsRight))/(60-time))
            wpm.innerText = WordsPerMinute
        }
        else{
            clearInterval(interval_time)
            time = 60
            finished = True
            wordInput.innerText = ''
        }
    }, 1000)
}

getQuote()
start_timer()
