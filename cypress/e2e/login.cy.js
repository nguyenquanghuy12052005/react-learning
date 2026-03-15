/* global cy, describe, it, beforeEach */
describe('Kiểm tra chức năng Đăng nhập', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Đăng nhập thành công với tài khoản hợp lệ', () => {

    cy.get('input[name="email"]').type('huy12@gmail.com');
    cy.get('input[name="password"]').type('123456789');
    cy.get('button[type="submit"]').click();
    
    // Kiểm tra đăng nhập thành công
    cy.url().should('include', '/'); // hoặc trang chủ '/'
     cy.get('.header__user-name').should('contain', 'Xin chào');
  });

  it('Hiển thị lỗi khi nhập sai mật khẩu', () => {
     cy.get('input[name="email"]').type('huy12@gmail.com');
    cy.get('input[name="password"]').type('12312');
    cy.get('button[type="submit"]').click();
    
    // Kiểm tra thông báo lỗi
    cy.contains('login sai rồi cu').should('be.visible');
    // Hoặc kiểm tra vẫn ở trang login
    cy.url().should('include', '/login');
  });

    it('Hiển thị lỗi khi nhập sai email', () => {
     cy.get('input[name="email"]').type('huy122312@gmail.com');
    cy.get('input[name="password"]').type('123456789');
    cy.get('button[type="submit"]').click();
    
    // Kiểm tra thông báo lỗi
    cy.contains('sai mail rồi cu').should('be.visible');
    // Hoặc kiểm tra vẫn ở trang login
    cy.url().should('include', '/login');
  });
});