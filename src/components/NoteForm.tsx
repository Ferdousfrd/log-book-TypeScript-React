import { FormEvent, useRef, useState } from "react";
import { Form, Row, Stack, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
}

export default function NoteForm({ onSubmit }: NoteFormProps){

    const taskTitleRef = useRef<HTMLInputElement>(null)
    const taskBodyRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])


    function handleSubmit(event : FormEvent){
        event.preventDefault()

        onSubmit({
            title: taskTitleRef.current!.value,     // using this '!' means these title, markdown never gonan be null since we added reuired on the field
            markdown: taskBodyRef.current!.value,
            tags: []
        })
    }

    return(
        <Form onSubmit={handleSubmit}>
            {/* this stack is for form elements*/}
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>TItle</Form.Label>
                            {/* this <Form.Control> is just input field under the hood. this ref is reference to our const asigned above with useRef() hook*/}
                            <Form.Control ref={taskTitleRef} required />         
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            {/* prebuilt dropdown select elemment where we can create our tags*/}
                            <CreatableSelect 
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id}
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value}
                                    }))
                                }}
                                isMulti 
                            />   
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                     {/* this is just textarea field under the hood. added 15 rows so its bigger text field. also adding ref*/}
                    <Form.Control ref={taskBodyRef} required as="textarea" rows={15} />          
                </Form.Group>          

                {/* this stack is for form buttons*/}
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to="..">
                        <Button type="button" variant="outline-secondary">Cancel</Button>   {/* on cancel btn press, it will take to on page back wiht link "../" which is Home page*/ }
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}