import Recat, { useContext, useEffect } from 'react';
import { DetailContext } from '../store';

export default function Detail() {
	const { detail, isAdmin } = useContext(DetailContext)
	useEffect(() => {
		console.log(detail, isAdmin)
	})

	return (<>{
		isAdmin ? (<>
			<h3>
				User Details
			</h3>
			<table className="adminTable">
				<thead>
					<tr className="tableHeadRow">
						<th className="tableHead">Name</th>
						<th className="tableHead">Email</th>
						<th className="tableHead">Role</th>
					</tr>
				</thead>
				<tbody>
					{detail.map(item => {
						return <tr key={item.id} className={item.id % 2 == 0 ? 'tableroweven' : 'tablerowodd'}>
							<td className="tableCell">{item.name}</td>
							<td className="tableCell">{item.email}</td>
							<td className="tableCell">{item.role}</td>
						</tr>
					})}
				</tbody>
			</table>
		</>) : (<><h3>Profile</h3>
			<table className="eTable">
				<tr>
					<td>
						<h5>Name:</h5>
					</td>
					<td>
						<p>{detail[0].name}</p>
					</td>
				</tr>
				<tr>
					<td>
						<h5>Email:</h5>
					</td>
					<td>
						<p>{detail[0].email}</p>
					</td>
				</tr>
				<tr>
					<td>
						<h5>Role:</h5>
					</td>
					<td>
						<p>{detail[0].role}</p>
					</td>
				</tr>
			</table></>)
	}</>)

}