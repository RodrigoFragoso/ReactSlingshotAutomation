describe('Form Month - Fuel Savings Analysis', function() {
  beforeEach('Acessa a pagina fuel-savings', function() {
    cy.visit('http://localhost:3000/fuel-savings')
  })

  it('Verifica se existe o titulo', function(){
    cy.get('h2').should('contain','Fuel Savings Analysis')
  })

    let newMpg = 500
    let tradeMpg = 27
    let newPpg = 45
    let tradePpg = 155
    let milesDriven = 900

  it('Preenche informações', function() {
    cy
      .get('input[name="newMpg"]').type(newMpg)
      .get('input[name="tradeMpg"]').type(tradeMpg)
      .get('input[name="newPpg"]').type(newPpg)
      .get('input[name="tradePpg"]').type(tradePpg)
      .get('input[name="milesDriven"]').type(milesDriven)
      .get('select').select('Month')
  })

  it('Verifica se carregou as colunas de resultados', () => {
    cy.get('td').should('contain', 'Savings')
  })

  it('Verifica se carregou as colunas de resultados', () => {
    cy
      .get('tbody').get('td').should('contain','Monthly')
      .get('tbody').get('td').should('contain','1 Year')
      .get('tbody').get('td').should('contain','3 Year')
  })

  /*NÃO FINALIZEI O CALCULO DE VERIFICAÇÃO, POIS NÃO ENTENDI A REGRA DE NEGÓCIO, ATÉ CHEGAR AO CALCULO FINAL*/
  it('Verifica os resultados', () => {
    let resultMonthly = (milesDriven/12)*52
    let resultOneYear = resultMonthly.toFixed(2)*12
    let resultThreeYear = resultMonthly.toFixed(2)*36
    cy
      .get('td.savings').should('contain', '$'+resultMonthly.toFixed(2).toLocaleString())
      .get('td.savings').should('contain', '$'+resultOneYear.toLocaleString())
      .get('td.savings').should('contain', '$'+resultThreeYear.toLocaleString())
  })

  it('screenshot no final do teste'), () =>{
    cy.screenshot('my-screenshot')
  }

  it('Clica no botão save', () => {
    cy.get('input[type="submit"]').click()
  })

})
