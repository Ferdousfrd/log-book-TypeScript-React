import { Form, Row, Stack, Col, Button } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

export default function NoteForm(){
    return(
        <Form>
            {/* this stack is for form elements*/}
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>TItle</Form.Label>
                            <Form.Control required />           {/* this is just input field under the hood*/}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableSelect isMulti />         {/* dropdown select where we can create our tags*/}
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as="textarea" rows={15} />           {/* this is just textarea field under the hood. added 15 rows so its bigger text field*/}
                </Form.Group>          

                {/* this stack is for form buttons*/}
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit" variant="primary">Save</Button>
                    <Button type="button" variant="outline-secondary">Cancel</Button>
                </Stack>
            </Stack>
        </Form>
    )
}