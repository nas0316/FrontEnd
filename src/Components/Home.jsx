import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DetailContext } from '../store';


export default function Home() {
	let navigate = useNavigate();
	const [cred, setCred] = useState({
		email: '', Password: ''
	});
	const [err, setErr] = useState('');
	const { setDetail, setIsAdmin } = useContext(DetailContext)

	function onChange(e) {
		setErr('');
		let { name, value } = e.target;
		setCred((prev) => {
			return { ...prev, [name]: value }
		});
	}
	function submit() {
		if (cred.email == "" || cred.Password == "") {
			setErr('please provide input')
		}
		else {
			axios.post('http://localhost:8000/', cred).then((res) => {
				//navigate('detail')
				if (res.data.length) {
					if (res.data[0].role == "ADMIN") {
						setIsAdmin(true);
						axios.get('http://localhost:8000/').then(result => {
							setDetail(result.data);
						})
					}
					else {
						setIsAdmin(false);
						setDetail(res.data);
					}
					navigate('detail')

				}
				else {
					setCred({
						email: '', Password: ''
					})
					setErr('email or password is wrong');
				}
			})
				.catch(err => {
					setErr(err.response.data.error);
				})
		}
	}

	return <>
		{err && <p>{err}</p>}
		<table>
			<tbody>
				<tr><td><h4>Email</h4></td></tr>
				<tr><td><input name="email" value={cred.email} onChange={onChange} /></td></tr>
				<tr><td><h4>Password</h4></td></tr>
				<tr><td><input name="Password" type="password" value={cred.Password} onChange={onChange} /></td></tr>
				<tr><td><button onClick={submit}>Submit</button></td></tr>
			</tbody>
		</table>
	</>
}