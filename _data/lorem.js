import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    }
});

export default {
    word : lorem.generateWords(1),
    sentence : lorem.generateSentences(1),
    paragraph : lorem.generateParagraphs(1),
    section : lorem.generateParagraphs(3)
}