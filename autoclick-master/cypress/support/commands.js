/// <reference types="cypress" />
Cypress.Commands.add('oncemoreplz', () => {
    cy.get('div.box.py-3.quizattempt').within(() => {
        cy.get('button.btn.btn-secondary').click();
    });
    cy.get('div').each(($div) => {
        if ($div.find('input[type="radio"]').length === 4) {
          cy.wrap($div).find('input[type="radio"]').eq(Math.floor(Math.random() * 4)).click();
        }
    })
    cy.contains('Hoàn thành bài thi...').click()
    cy.wait(1000)
    cy.contains('Nộp bài và kết thúc').click()
    cy.wait(1000)
    cy.get('div[role="dialog"]').find('.btn.btn-primary').click();
    cy.get('td.cell > :nth-child(1)')
    .invoke('text')
    .then((text) => {
        var score = Number(text.replace(',', '.'))
        cy.log(score)
    cy.wait(1000)
    cy.scrollTo(0,5000)
    cy.contains('Dừng xem lại').click();
    if(score < 5){
        cy.oncemoreplz()
        }
    else {
       cy.pause();
        }
    })
})