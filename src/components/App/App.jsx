import  {Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { Container, Section, TitleH1, TitleH2 } from './App.styled';
import initialList from './initial';

export class App extends Component {
  state = {
    contacts: initialList,
    filter: '',
  };

  // Добавляет контакт в список
  addContact = ({ name, number }) => {
    const normalizedFind = name.toLowerCase();
    const findName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalizedFind
    );
    if (findName) { // проверяет на наличие одинаковіх контактов
      return alert(`${name} is already in contacts.`);
    }

    const findNumber = this.state.contacts.find(
      contact => contact.number === number
    );
    if (findNumber) {// проверяет совпадения номеров
      return alert(`This phone number is already in use.`);
    }

    this.setState(({ contacts }) => ({
      contacts: [{ name, number, id: nanoid() }, ...contacts],
    }));
  };

  // Возвращает результат фильтра
  getContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Удаляет контакт из списка
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getContacts();

    return (
      <Container>
        <Section title="Phonebook">
          <TitleH1>Phonebook</TitleH1>
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <TitleH2>Contacts</TitleH2>
          <Filter value={filter} onChange={this.handleFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </Container>
    );
  }
}