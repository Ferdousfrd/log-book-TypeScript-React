import { FormEvent, useRef, useState } from "react";
import { Form, Row, Stack, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid"

type NoteFormProps = {
    onSubmit: (data: NoteData) => void,
    onAddTag: (tag: Tag) => void,
    availableTags: Tag[]
} & Partial<NoteData>               // Partial generic to make notedata optional. Only use in edit


export default function NoteForm({ onSubmit,onAddTag, availableTags, title="", markdown="", tags = [] }: NoteFormProps){

    const taskTitleRef = useRef<HTMLInputElement>(null)
    const taskBodyRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()


    function handleSubmit(event : FormEvent){
        event.preventDefault()

        onSubmit({
            title: taskTitleRef.current!.value,     // using this '!' means these title, markdown never gonan be null since we added reuired on the field
            markdown: taskBodyRef.current!.value,
            tags: selectedTags
        })

        navigate('..s')
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
                            <Form.Control ref={taskTitleRef} required defaultValue={title}/>         
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            {/* prebuilt dropdown select elemment where we can create our tags*/}
                            <CreatableSelect
                                onCreateOption={label => {
                                    const newTag = { id: uuidV4(), label }
                                    onAddTag(newTag)
                                    setSelectedTags(prev => [...prev, newTag])
                                }} 
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id}
                                })}
                                options={availableTags.map(tag => {
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
                    <Form.Control ref={taskBodyRef} required defaultValue={markdown} as="textarea" rows={15} />          
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