import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // 追加
import jaLocale from '@fullcalendar/core/locales/ja';

class Work extends React.Component {   //page2クラスにReact.Componentを継承する
    render(){
        return (
            <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]} // 追加
                initialView="dayGridMonth"
                locales={[jaLocale]}
                locale='ja'
                headerToolbar={{                          // 追加
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek',
                }}
                events={[
                    {title:'eventを', start: '2023-05-14'},
                    {title:'こんな感じで追加できます', start: '2023-05-15', end: '2023-05-17'}
                ]}
            />
            </div>
        );
    }
}

export default Work;  