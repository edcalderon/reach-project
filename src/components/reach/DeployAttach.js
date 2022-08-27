import React, { useContext, useState } from "react";
import * as Backend from "../../build/index.main.mjs";
import { loadStdlib } from '@reach-sh/stdlib';
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Context } from "../../Context";
const Reach = loadStdlib('ALGO');

const buttonStyleAttach = {
    bottom: "2em",
    right: "2em",
    backgroundColor: "#000",
    borderRadius: "15px"
}

const buttonStyleDeploy = {
    bottom: "2em",
    right: "2em",
    backgroundColor: "#000",
    borderRadius: "15px"
}

export const DeployButton = ({ ctcArgs }) => {
    const [account, , , setBalance, , setCtcInfo, ctc, setCtc, , setCtcArgs] = useContext(Context);
    const [show, setShow] = useState(false);
    const history = useHistory();

    const setCreator = async () => {
        return new Promise(async (resolve) => {
            const ctc = await account.contract(Backend);
            setCtc(ctc);
            console.log(ctc)
            let creator = {}
            creator.interval = setInterval(async () => updateBalance(), 5000);
            console.log(ctcArgs)
            creator.getId = 1;
            creator.deadline = ctcArgs[0].deadline;
            creator.nftViewAddress = ctcArgs[0].nftViewAddress;
            const res = await Backend.Creator(ctc, creator);
            resolve(ctc, res)
        })
    }

    const updateBalance = async () => {
        const balance = Reach.formatCurrency(await Reach.balanceOf(account), 4);
        setBalance(balance);
    }

    const deploy = async () => {
        setShow(true)
        setCreator()
        const getInfoCtc = ctc && await ctc.getInfo()
        console.log('ctc', getInfoCtc)
        setCtcArgs(ctcArgs)
        const ctcInfo = JSON.stringify(getInfoCtc, null, 2)
        setCtcInfo([ctcInfo])
        history.push('/deploy')
    };

    return (
        <>
            <Button variant="success" style={buttonStyleDeploy} onClick={() => deploy()}>
                Deploy
            </Button>
            <DeployModal show={show} />
        </>
    );
}

export const AttachButton = () => {
    const [account, , , , , , , setCtc] = useContext(Context);
    const [show, setShow] = useState(false);
    const history = useHistory();
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const attach = async (ctcInfo) => {
        const ctc = await account.attach(Backend, JSON.parse(ctcInfo));
        setCtc([ctc]);
        console.log("Attached to the contract");
        history.push("/app/bidder");
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow} style={buttonStyleAttach}>
                Attach
            </Button>
            <AttachModal
                show={show}
                handleClose={handleClose}
                attach={attach} />
        </>
    );
}

const AttachModal = ({ show, handleClose, attach }) => {
    const handleAttach = () => {
        const info = document.querySelector("#ctcArea").value;
        attach(info);
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Attach to Contract</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    id="ctcArea"
                    as="textarea"
                    rows="10"
                    placeholder="Paste contract info here" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAttach}>
                    Attach
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const DeployModal = ({ show }) => {
    return (
        <Modal show={show} centered className="text-center">
            <Modal.Body>
                <h2>Deploying the contract</h2>
                <Spinner animation="border" />
            </Modal.Body>
        </Modal>
    );
}
