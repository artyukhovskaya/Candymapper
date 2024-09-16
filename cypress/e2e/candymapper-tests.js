/*
https://candymapper.com - нужно будет создать акк, потом использовать креды для  авторизации
1) Нужно выбрать Halloween Party - проверить переход на страницу
2) Выбрать тематику > вырать количесто гостей 1 или 2, проверить что выбрано (если есть желание усложнить себе задачу, можете сделать рандомный выбор из dropdown)
3) Ввести невалидную электронную почту в поле ввода и проверить сообщения об ошибке: Please enter a valid email address.
*/

/// <reference types="cypress" />

import _ from 'lodash';

describe('Candymapper tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('https://candymapper.com');
    cy.get('#popup-widget238491-close-icon').click();
    cy.get('svg.c2-g').click();
    cy.get('#n-238369238407-membership-sign-in').click();
    cy.get('.x-el-form > :nth-child(1) > .x-el').type('y.artyukhovskaya@gmail.com');
    cy.get('.x-el-form > :nth-child(2) > .x-el').type('Туцзфыыц0кв!');
    cy.get('.x-el-form > :nth-child(5) > .x-el').click();
  });

  it('Halloween party', () => {
    cy.contains('Halloween Party').click();
    cy.url().should('eq', 'https://candymapper.com/halloween-party');
    cy.get('#nav-306407 > :nth-child(3) > .x-el').highlight();
    cy.screenshot('1-Halloween-party');
  });

  it('Party guests', () => {
    cy.get('#nav-306653 > :nth-child(3) > .x-el').should('be.visible').click();
    cy.get('[href="/host-a-party-1"]').click();
    cy.get('[data-tccl="ux2.buttons.buttons_cta_1.click,click"]').click();
    const randomGuestsNumber = _.sample(['1', '2']);
    cy.getIframe('#iframe-06').find('#guests').select(randomGuestsNumber);
    cy.getIframe('#iframe-06').find('#guests').should('have.value', randomGuestsNumber);
    cy.getIframe('#iframe-06').find('#guests').highlight();
    cy.screenshot('2-Party-guests');
  });

  it('Invalid email', () => {
    cy.get('#nav-306653 > :nth-child(3) > .x-el').should('be.visible').click();
    cy.get('[href="/host-a-party-1"]').click();
    cy.get('[data-tccl="ux2.buttons.buttons_cta_1.click,click"]').click();
    cy.getIframe('#iframe-06').find('#guests').select('1');
    cy.get('#input7').type('aaa');
    cy.get('.x-el-button').click();
    cy.get('.c2-4n > .x-el').should('have.text', 'Please enter a valid email address.');
    cy.get('.c2-4n > .x-el').highlight();
    cy.screenshot('3-Invalid-email');
  });
});
