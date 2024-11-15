/// <reference types="cypress" />
describe('Test with Page Objects', () => {
    beforeEach('login', () => {
        cy.clearCookies()
        cy.visit('/')
        cy.get('#username').type('K24DTCN227') 
        cy.get('#password').type('tutai42493')
        //Thay tkhoan mkhau vao
        cy.get('#loginbtn').click()
    })
    it('autoclick', () => {
        cy.visit('/')
        cy.wait(2000)
        cy.get('[class="card-deck dashboard-card-deck "]')
        //Auto click vào bài đầu tiên trong list Course review
        .find('[class="card-img dashboard-card-img"]').first().click()
        cy.contains('Câu hỏi ôn tập chương 4').click(); //Moi nguoi tu thay doi chuong nhe =))) auto cai nay met vcl
        cy.get('div.box.py-3.quizattempt').within(() => {
            cy.get('button.btn.btn-secondary').click();
        });
        cy.get('div').each(($div) => {
            // Check if the div contains exactly 4 radio buttons
            if ($div.find('input[type="radio"]').length === 4) {
              // Select a random radio button within the div
              cy.wrap($div).find('input[type="radio"]').eq(Math.floor(Math.random() * 4)).wait(1000).click();
            }
        })
        cy.contains('Hoàn thành bài thi...').click()
        cy.wait(1000)
        cy.contains('Nộp bài và kết thúc').click()
        cy.wait(1000)
        cy.get('div[role="dialog"]').find('.btn.btn-primary').click();
        var score
        cy.get('td.cell > :nth-child(1)')
        .invoke('text')
        .then((text) => {
            var score = Number(text.replace(',', '.'))
            cy.log(score)
            cy.log(score > 0)
        })
        cy.wait(1000)
        cy.scrollTo(0,5000)
        cy.contains('Dừng xem lại').click();
        cy.oncemoreplz()
    })
})