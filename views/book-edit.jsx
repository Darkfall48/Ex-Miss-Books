const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import {
  eventBusService,
  showSuccessMsg,
} from '../services/event-bus.service.js'

export function BookEdit() {
  return <h1>Hello From Book Edit</h1>
}
