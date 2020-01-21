import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

export const Welcome = styled.h1`
    margin-right: 5px;
`;

export const ReservationsSection = styled.div`
    width: 100%;
    height: 100%;
    padding: 5%;
`;

export const ToolBar = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ReservationSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const Sleev = styled.div`
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
        Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-weight: 300;
    position: relative;
    display: flex;
    padding: 5%;
    margin: 1% 0%;
    justify-content: space-evenly;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
        0 0 40px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
        0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
`;

export const Label = styled.div`
    color: gray;
    font-size: 12px;
`;

export const Uuid = styled.div`
    position: absolute;
    color: gray;
    margin: 3px 5px;
    font-size: 12px;
    bottom: 0;
    left: 0;
`;

export const CheckIn = styled.div`
    display: flex;
    width: 20%;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const CheckOut = styled.div`
    display: flex;
    width: 20%;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const Hotel = styled.div`
    display: flex;
    width: 30%;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const Room = styled.div`
    display: flex;
    width: 30%;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const GuestName = styled.div`
    position: absolute;
    margin: 3px 5px;
    top: 0;
    left: 0;
`;

export const Price = styled.div`
    position: absolute;
    margin: 3px 5px;
    top: 0;
    right: 0;
`;
