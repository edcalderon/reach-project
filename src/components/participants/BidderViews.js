import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { InformTimeout, SeeOutcome, IsAuctionOn, ShowBid } from "./PlayerViews";
import Button from "react-bootstrap/Button";
import {loadStdlib} from '@reach-sh/stdlib';
const Reach = loadStdlib('ALGO');

const BidderViews = ({appState, args, getBidReady, getBid, isAuctionOnReady, isAuctionOn}) => {
  switch (appState) {
    case "getBid":
      return getBidReady ? (
        <GetBid getId ={args[0]} nftViewAddress={args[1]} getBid={getBid} />
      ) : (
        <Container style={{
          display: "grid",
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 20px",
          borderRadius: "0.3rem",
          padding: "2rem",
      }} className="mt-4">
          <h1>Waiting the Contract...</h1>
          <Button variant="info" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>      
        </Container>
      );
    case "informTimeout":
      return <InformTimeout />;
    case "seeOutcome":
      return <SeeOutcome getId ={args[0]} nftViewAddress={args[1]} address={args[2]} />;
    case "showBid":
      return <ShowBid getId ={args[0]}  nftViewAddress={args[1]} getBid={args[2]} address={args[3]}/>; 
    case "isAuctionOn":
      return (isAuctionOnReady ? 
      (        <IsAuctionOn getId ={args[0]}  nftViewAddress={args[1]} isAuctionOn={isAuctionOn} />
      ) : (
        <Container style={{
          display: "grid",
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 20px",
          borderRadius: "0.3rem",
          padding: "2rem",
      }} className="mt-4">
          <h1>Waiting the Contract...</h1>
          <Button variant="info" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>      
        </Container>
      ));
    default:
      break;
  }
  return (
    <Container style={{
      display: "grid",
      backgroundColor: "white",
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 20px",
      borderRadius: "0.3rem",
      padding: "2rem",
  }} className="mt-4">
      <h1>Waiting the Contract...</h1>
      <Button variant="info" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>  
    </Container>
  );
};

export default BidderViews;

export const GetBid = ({getId, nftViewAddress, getBid}) => {
    const [bid, setBid] = useState(0);
    const handleSet = () => {      
        const bid2= Reach.parseCurrency(bid)
        getBid(bid2)
    } 
  return (
      <Container style={{
        display: "grid",
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 20px",
        borderRadius: "0.3rem",
        padding: "2rem",
        marginTop:"2rem"
    }}>
        <div style={{textAlign:"center"}}>
          <img alt= "NFT" src={nftViewAddress} style={{borderRadius: "0.3rem", border: "3px solid #000", width: '300px'}} />
          <h2>{`ID: ${getId}`}</h2>
          <hr></hr>                               
        </div>
        <Form.Group>
          <Form.Label><h3> </h3><h3>Please, Enter Your Bid</h3></Form.Label>
          <Form.Control        
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            type="number"
            placeholder=" Enter Bid"
          />
        </Form.Group>
        <Button variant="info" onClick={handleSet} >Give Offer</Button>
      </Container>
  );
};
