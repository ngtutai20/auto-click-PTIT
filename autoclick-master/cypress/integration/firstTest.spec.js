

describe('Login', () => {
    it('click click', () => {

        cy.visit('/')
        cy.get('.username').type('K24DTCN227')
        cy.get('.username').type('tutai42493')
        //by Tag name
        cy.get('input')
        //by ID
        cy.get('#inputEmail1')
        //by class
        cy.get('.input-full-width')
        //by attribute name
        cy.get('[fullwidth]')
        //by attribute and value
        cy.get('[placeholder="Email"]')
        //by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        //by two attributes
        cy.get('[placeholder="Email"][fullwidth]')
        //by tag, attribute, id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')
        //by Cypress test ID
        cy.get('[data-cy="imputEmail1"]')  //if have access to the source code
    })

    it('second test', () =>{
        cy.visit('/')
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()

        //Theory
        // get() - find elements onm the page by locator globally
        // find() - find child elements by locator
        // contains() - find HTML text and by text and locator
        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')

        //cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })
})

    it('save subject of the command', () => {
        cy.visit('/')
        cy.contains('Form').click()
        cy.contains('Form Layouts').click()
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        //CANT DO THING LIKE THIS
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password')

        // 1 Cypress Alias
        cy.contains('nb-card', 'Using the Grid').as ('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        // 2 Cypress then() method
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })
        it('extract text values', () => {
            cy.visit('/')
            cy.contains('Form').click()
            cy.contains('Form Layouts').click()
            // 1
            cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

            // 2
            cy.get('[for="exampleInputEmail1"]').then( label => {
                const labelText = label.text()
                expect(labelText).to.equal('Email address')
                cy.wrap(labelText).should('contain', 'Email address')
            })

            // 3
            cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
                expect(text).to.equal('Email address')
            })

            // 4 invoke attr
            cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then( classValue => {
                expect(classValue).to.equal('label')
            })

            // invoke property
            cy.get('#exampleInputEmail1').type('test@test.com')
            cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com').then( property => {
                expect(property).to.equal('test@test.com')
            })    
        })
        // RADIO
        it('radio button', () => {
            cy.visit('/')
            cy.contains('Form').click()
            cy.contains('Form Layouts').click()

            cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
                cy.wrap(radioButtons).eq(0).check({force:true}).should('be.checked')
                cy.wrap(radioButtons).eq(1).check({force:true})
                cy.wrap(radioButtons).eq(0).should('not.be.checked')
                cy.wrap(radioButtons).eq(2).should('be.disabled')
            })
        })
        //CHECK BOX
            it('checkboxes' ,() => {
                cy.visit('/')
                cy.contains('Modal & Overlays').click()
                cy.contains('Toastr').click()

                cy.get('[type="checkbox"]').uncheck({force:true})
                cy.get('[type="checkbox"]').eq(0).click({force:true})
                cy.get('[type="checkbox"]').eq(1).check({force:true})
            })
        //DATE PICKER  
            it('Date picker', () =>{

                function selectDayFromCurrent(day) {
                    let date = new Date()
                    date.setDate(date.getDate() + day)
                    let futureDay  = date.getDate()
                    let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
                    let futureYear  = date.getFullYear()
                    let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
                    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute =>{
                        if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                            cy.get('[data-name="chevron-right"]').click()
                            selectDayFromCurrent(day)
                        } else {
                            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                        }
                    })
                    return dateToAssert
                }

                cy.visit('/')
                cy.contains('Forms').click()
                cy.contains('Datepicker').click()
                cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
                    cy.wrap(input).click()
                    const dateToAssert = selectDayFromCurrent(200)
                    cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
                    cy.wrap(input).should('have.value', dateToAssert)
                })
            })

            it('Lists and dropdowns', () => {
                cy.visit('/')
                // 1
                cy.get('nav nb-select').click()
                cy.get('.options-list').contains('Dark').click()
                cy.get('nav nb-select').should('contain', 'Dark')

                // 2 loop
                cy.get('nav nb-select').then( dropDown => {
                    cy.wrap(dropDown).click()
                    cy.get('.options-list nb-option').each( (listItem, index) => {
                        const itemText = listItem.text().trim()
                        cy.wrap(listItem).click()
                        cy.wrap(dropDown).should('contain', itemText)
                        if( index <3) {
                            cy.wrap(dropDown).click()
                        }
                    })
                })
            })
            
            it('Web tables', () => {
                cy.visit('/')
                cy.contains('Tables & Data').click()
                cy.contains('Smart Table').click()

                //1 Get the row by text 
                cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
                    cy.wrap(tableRow).find('.nb-edit').click()
                    cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('30')
                    cy.wrap(tableRow).find('.nb-checkmark').click()
                    cy.wrap(tableRow).find('td').eq(6).should('contain', '30')
                })


                //2 Get row by index
                
            })
