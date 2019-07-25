describe('Form Year - Fuel Savings Analysis', function() {
  before('Acessa a pagina fuel-savings', function() {
    cy.visit('http://localhost:3000/fuel-savings')
  })

  it('Verifica se existe o titulo', function(){
    cy.get('h2').should('contain','Fuel Savings Analysis')
  })

    let newMpg = '300.00'
    let tradeMpg = '20.00'
    let newPpg = '70.00'
    let tradePpg = '300.00'
    let milesDriven = '800.00'

  it('Preenche informações', function() {
    cy
      .get('input[name="newMpg"]').type(newMpg)
      .get('input[name="tradeMpg"]').type(tradeMpg)
      .get('input[name="newPpg"]').type(newPpg)
      .get('input[name="tradePpg"]').type(tradePpg)
      .get('input[name="milesDriven"]').type(milesDriven)
      .get('select').select('Year')
  })

  it('Verifica se carregou as colunas de resultados', () => {
    cy
      .get('td').should('contain', 'Savings')
      .get('tbody').get('td').should('contain','Monthly')
      .get('tbody').get('td').should('contain','1 Year')
      .get('tbody').get('td').should('contain','3 Year')
  })

  it('Verifica os resultados fixos', function(){
    let resultMonthlyFixed = '$984.44'
    let resultOneYearFixed = '$11,813.28'
    let resultThreeYearFixed = '$35,439.84'
    cy
      .get('td.savings').should('contain', resultMonthlyFixed)
      .get('td.savings').should('contain', resultOneYearFixed)
      .get('td.savings').should('contain', resultThreeYearFixed)
  })

  /*NÃO FINALIZEI O CALCULO DE VERIFICAÇÃO, POIS NÃO ENTENDI A REGRA DE NEGÓCIO, ATÉ CHEGAR AO CALCULO FINAL*/
  it('Verifica os resultados randomico', () => {
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
