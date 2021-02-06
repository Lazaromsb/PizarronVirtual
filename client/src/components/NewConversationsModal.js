import React, { useState, /* useRef */ } from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsProvider'
import {useConversations} from '../contexts/ConversationsProvider'

export default function NewConversationsModal({closeModal}) {
  const [selectedContactIds, setSelectedContactIds] = useState([])
  const {contacts} =useContacts()
  const {createConversations} =useConversations()
  // const chatRef = useRef()

  function handleSubmit(e){
    e.preventDefault()
    createConversations(setSelectedContactIds)
    closeModal()
  }

  function handleCheckboxChange(contactId){
    setSelectedContactIds(prevSelectedContactIds => {
      if (prevSelectedContactIds.includes(contactId)){
        return prevSelectedContactIds.filter(prevId => {
          return contactId !== prevId
        })
      } else{
        return[...prevSelectedContactIds, contactId]
      }
    })
  }

  return (
    <>
      <Modal.Header closeButton>Crear nuevo chat</Modal.Header>
      <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group>
              <Form.Label>Nombre del chat</Form.Label>
              <Form.Control type="text" ref={chatRef} required />
            </Form.Group> */}
            {contacts.map(contact => (
              <Form.Group controlId={contact.id} key={contact.id}>
                <Form.Check
                  type="checkbox"
                  value={selectedContactIds.includes(contact.id)}
                  label={contact.name}
                  onChange={()=> handleCheckboxChange(contact.id)}
                />
              </Form.Group>
            ))}
            <Button type="submit">Crear</Button>
          </Form>
      </Modal.Body>
    </>  )
}
