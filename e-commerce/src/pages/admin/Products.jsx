import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Myaccordion } from '../../components/admin/Myaccordion';




export function Products() {


	return (
		<div>
			<h1 className="text-center">Hello ffrom products 

			</h1>
		<Myaccordion></Myaccordion>
		</div>
	);
}
