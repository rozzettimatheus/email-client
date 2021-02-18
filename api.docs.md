# PATH

`/auth/signup` (POST)
{
username: string
password: string
passwordConfirmation: string
}

###

`/auth/signin` (POST)
{
username: string
password: string
}

###

`/auth/username` (POST)
{
username: string
}

###

`/auth/signedin` (GET)
no body

###

`/auth/signout` (POST)
{ }
