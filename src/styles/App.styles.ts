import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  color: whitesmoke;

  .priceDisplay {
    font-size: 3rem;
    background-color: rgb(27, 73, 88);
    padding: 20px 40px;
    border-radius: 40px;
    margin-top: 40px;
  }

  .selectCurrency {
    color: rgb(226, 223, 219) !important;

    :before {
      border-color: whitesmoke !important;
    }
    :after {
      border-color: whitesmoke !important;
    }

    .MuiSvgIcon-root {
      fill: whitesmoke !important;
    }

    .currency__menu {
      color: #111 !important;
    }
  }
`;
