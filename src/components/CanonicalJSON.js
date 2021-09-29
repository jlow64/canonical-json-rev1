import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const CanonicalJSON = () => {
    const [jsonFile, setJsonFile] = useState();
    const [parsedJsonFile, setParsedJsonFile] = useState();

    const transformJSON = () => {
        function sortObjectByKeys(o) {
            return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
        }

        var jsonObj = JSON.parse(jsonFile);
        var sorted = sortObjectByKeys(jsonObj);
        var jsonString = JSON.stringify(sorted);
        console.log(jsonString);
        setParsedJsonFile(jsonString);
    };

    const onReaderLoad = (e) => {
        setJsonFile(e.target.result);
    }

    const handleJSON = (e) => {
        e.persist();
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(e.target.files[0]);
    };

    return (
        <Container>
            <h1>Canonical JSON</h1>
            <input 
                id='json-file-input'
                type='file' 
                accept='application/json'
                onChange={handleJSON}
            />
            <Form>
                <Form.Group className="mb-3 mt-3" >
                    <Form.Control as="textarea" placeholder="Input JSON" rows={10} value={jsonFile} disabled />
                </Form.Group>
                <Form.Group className="mb-3 mt-3" >
                    <Form.Control as="textarea" placeholder="Output JSON" rows={10} value={parsedJsonFile} disabled />
                </Form.Group>
            </Form>
            <Button type="primary" onClick={transformJSON}>Transform</Button>
        </Container>
    );
};

export default CanonicalJSON;