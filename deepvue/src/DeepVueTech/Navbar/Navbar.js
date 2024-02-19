import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavbarComponent = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="https://deepvue.tech/">DeepVueTech</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/pie">Statement Summary Card</Nav.Link>
            <Nav.Link href="/bar">EOD Analysis</Nav.Link>
            <Nav.Link href="/saving">Savings Analysis Card</Nav.Link>
            <Nav.Link href="/highest">
              Top 10 Credit/Debit Transactions
            </Nav.Link>
            <Nav.Link href="/summary">Exceptional Transaction</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
