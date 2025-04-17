import React, { useEffect } from "react";
import ChatBot from 'react-simple-chatbot';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledChatBot = styled(ChatBot)`
  .rsc-header, .rsc-ts-bubble, .rsc-ts-bubble::after {
    background-color: red !important;
  }
  .rsc-os-options button {
    border-color: red !important;
    background-color: red !important;
    &:hover {
      background-color: darkred !important;
    }
  }
  .rsc-message-bubble {
    color: white !important; /* Clients' text color */
  }
`;


function Chat() {

  useEffect(() => {
    console.log("Chat component mounted");
    return () => {
      console.log("Chat component unmounted");
    };
  }, []);
  
  const steps = [
    {
      id: 'Greet',
      message: 'Hello, Welcome to Evri Tech',
      trigger: 'Ask Name'
    },
    {
      id: 'Ask Name',
      message: 'Please enter your full name',
      trigger: 'waiting1'
    },
    {
      id: 'waiting1',
      user: true,
      trigger: 'Name'
    },
    {
      id: 'Name',
      message: 'Dear {previousValue}, Please enter your business name',
      trigger: 'business'
    },
    {
      id: 'business',
      user: true,
      trigger: 'webgraphic'
    },
    {
      id: 'webgraphic',
      message: 'Please select the service that you are interested in.',
      trigger: 'service'
    },
    {
      id: 'service',
      options: [
        {
          value: 'Web Development',
          label: 'Web Development',
          trigger: 'Web Development'
        },
        {
          value: 'Graphic Design',
          label: 'Graphic Design',
          trigger: 'Graphic Design'
        },
        {
          value: 'Both',
          label: 'Both',
          trigger: 'Both'
        },
        {
          value: 'Other Question/Issue',
          label: 'Other Question/Issue',
          trigger: 'Other Question/Issue'
        }
      ]
    },
    {
      id: 'Web Development',
      message: 'The prices for Web Development start at 249 USD. The average process of development and deployment takes approximately two weeks, but it might be shorter or longer depending on the size of the project.',
      end: true
    },
    {
      id: 'Graphic Design',
      message: 'The prices for Graphic Design start at 190 USD. The average process of design development takes approximately one week, but it might be shorter or longer depending on the size of the project.',
      end: true
    },
    {
      id: 'Both',
      message: 'The prices for combined Web Development and Graphic Design projects start at 439 USD. The average process of development, design, and deployment takes approximately two weeks, but it might be shorter or longer depending on the size of the project.',
      end: true
    },
    {
      id: 'Other Question/Issue',
      message: 'For any other inquiries, please contact us by filling out the form in the contact section at the bottom of the Home Page.',
      end: true
    }
  ];

  return (
    <Segment floated="right" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <StyledChatBot steps={steps} />
    </Segment>
  );
}

export default Chat;
