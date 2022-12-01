import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {createBook, getAllBooks, getBookById} from "../features/books/bookService";


const theme = createTheme();


export default function SignInSide() {
    const [bookId, setBookId] = useState([""])
    const [title, setTitle] = useState("")
    const [bookArr, setBookArr] = useState([])

    // Will be run everytime elements in the array changes
    useEffect(() => {
        console.log('render')
    }, [bookId])

    // Called when submit button is clicked
    const handleSubmitGetAllBooks = async (event) => {
        event.preventDefault();

        const result = await getAllBooks()
        setBookArr(result)
    };

    const handleSubmitGetById = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = formData.get('input')
        setBookId(oldInput => [...oldInput, data])

        const result = await getBookById(data)
        setTitle(result.title)
    };

    const handleSubmitUploadBook = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newTitle = formData.get('title')

        const result = await createBook(newTitle)
        console.log(result)
    };


    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Box component="form" noValidate onSubmit={handleSubmitGetAllBooks} sx={{mt: 1}}>
                    <div>
                        {bookArr.map((item, i) => <h1 key={i}> {item.title} </h1>)}
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Get All books
                    </Button>
                    <Grid container>
                    </Grid>
                </Box>
                <Box component="form" noValidate onSubmit={handleSubmitGetById} sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="input"
                        label="Book id"
                        name="input"
                        autoFocus
                    />
                    <ChildComponent PropName={bookId}/>
                    <h1>{title}</h1>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Get books by id
                    </Button>
                    <Grid container>
                    </Grid>
                </Box>
                <Box component="form" noValidate onSubmit={handleSubmitUploadBook} sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="title"
                        name="title"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Upload book
                    </Button>
                    <Grid container>
                    </Grid>
                </Box>
            </Grid>
        </ThemeProvider>
    );
}

function ChildComponent({PropName}) {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id="input"
            label={PropName}
            name="input"
            autoFocus
        />
    )
}
