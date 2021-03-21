import express from 'express';
import { School } from '../types/school';

const router = express.Router();

const data: School[] = [
    {
        id: 1,
        name: '하남고',
    },
];

router.get('/', (req, res) => {
    const { name } = req.query; //디스트럭처링
    const result = [];
    if (name) {
        const filtered = data.filter((school: School) => school.name === name); //School값 school.name 중에 name이랑 같은게있다면   
        result.push(...filtered);   //...은 배열의 요소들을 빼서 push
    } else {
        result.push(...data);
    }
    return res.status(200).json(result);
});

router.get('/:schoolId', (req, res) => {
    const { schoolId } = req.params;
    if (!schoolId) {
        return res.status(400).json;
    }

    const schoolIdNumber: number = parseInt(schoolId, 10);
    if (!data.some(({ id }) => id === schoolIdNumber)) {
        return res.status(404).json();
    }

    const filtered = data.filter((item: School) => item.id === schoolIdNumber);
    return res.status(200).json(filtered[0]);
});

router.post('/', (req, res) => {
    /* const school: School = req.body as School;
    let maxId = 0;
    for(const item of data){
        if(item.id>maxId) maxId = item.id;
    }
    data.push({id:maxId+1,name: school.name});
    return res.status(201).json(); */
    //반복문을 활용한 방법

    const { name } = req.body as { name: string };
    if (!name) {
        return res.status(400).json();
    }

    const newId: number = Math.max(...data.map((itemL: School) => itemL.id)) + 1;
    const school: School = {
        name,
        id: newId,
    };
    data.push(school);
    return res.status(201).json();
    //JavaScript의 문법을 활용한 방법
});

router.put('/:schoolId', (req, res) => {
    const { schoolId } = req.params;
    if (!schoolId) {
        return res.status(400).json;
    }

    const schoolIdNumber: number = parseInt(schoolId, 10);
    if (!data.some(({ id }) => id === schoolIdNumber)) {
        return res.status(404).json();
    }
    const school: School = req.body as School;
    if (school.id !== schoolIdNumber) {
        return res.status(400).json();
    }

    const index: number = data.findIndex((existSchool: School) => existSchool.id === schoolIdNumber);
    data[index] = school;
    return res.status(200).json();
});

router.delete('/:schoolId', (req, res) => {
    const { schoolId } = req.params;    //디스트럭처링
    if (!schoolId) {
        return res.status(400).json();
    }

    const schoolIdNumber: number = parseInt(schoolId, 10);
    if (!data.some(({ id }) => id === schoolIdNumber)) {
        return res.status(404).json();
    }

    const index: number = data.findIndex((school: School) => school.id === schoolIdNumber);
    data.splice(index, 1);//index 한 개의 값을 없애주는 splice(index,num)
    return res.status(200).json();
});


export default router;