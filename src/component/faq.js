import React from 'react';

const Faq = () => {
    return (
        <div>
            <br />
            <div className="d-flex w-100 justify-content-between bg-dark text-white p-2">
               <h5 className="mb-1">GNIB/IRP</h5>
            </div>
            <br />
            <div id="accordion">
                <div className="card">
                    <div className="card-header" id="gnib-heading-1">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-1" aria-expanded="false" aria-controls="gnib-collapse-1">
                            My GNIB is expiring soon but I have got an appointment only for a later date. Will that constitute an illegal stay ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-1" className="collapse" aria-labelledby="gnib-heading-1" data-parent="#accordion">
                        <div className="card-body">
                        As received from <a href="mailto:burghquayregoffice@justice.ie">burghquayregoffice@justice.ie</a>, please note that the ensuing gap between the expiration of the current permission and the booked appointment should not create a period of illegal status in the State.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-2">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-2" aria-expanded="false" aria-controls="gnib-collapse-2">
                            I haven't received my IRP card yet. Can I use the registration stamp in my passport to apply for Re-entry visa ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-2" className="collapse" aria-labelledby="gnib-heading-2" data-parent="#accordion">
                        <div className="card-body">
                        Yes, the registration stamp in your passport is evidence of your immigration status in the State. This stamp is sufficient for applying for a Re Entry visa and, if appropriate, for taking up employment.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-3">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-3" aria-expanded="false" aria-controls="gnib-collapse-3">
                            Can I pay the registration fees using my forex card ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-3" className="collapse" aria-labelledby="gnib-heading-3" data-parent="#accordion">
                        <div className="card-body">
                        Yes, forex card is acceptable for payment.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-4">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-4" aria-expanded="false" aria-controls="gnib-collapse-4">
                            Can I pay the registration fees using cash ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-4" className="collapse" aria-labelledby="gnib-heading-4" data-parent="#accordion">
                        <div className="card-body">
                        No, only card payments are accepted.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-5">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-5" aria-expanded="false" aria-controls="gnib-collapse-5">
                            I forgot to bring a supporting document for my appointment. Will I be sent back and asked to book another appointment ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-5" className="collapse" aria-labelledby="gnib-heading-5" data-parent="#accordion">
                        <div className="card-body">
                        You will be provided with a "BURGH QUAY REGISTRATION OFFICE RETURN NOTICE" specifying the date and time at which you can return to the office to complete the registration with the required documents.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-6">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-6" aria-expanded="false" aria-controls="gnib-collapse-6">
                            To what address will my IRP card be posted ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-6" className="collapse" aria-labelledby="gnib-heading-6" data-parent="#accordion">
                        <div className="card-body">
                        You will be asked to fill up an address form before going to the registration booth to which your IRP card will be posted.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-7">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-7" aria-expanded="false" aria-controls="gnib-collapse-7">
                            How many days will it take to receive my IRP card ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-7" className="collapse" aria-labelledby="gnib-heading-7" data-parent="#accordion">
                        <div className="card-body">
                        Your card will be posted to you and should arrive within 10 working days.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-8">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-8" aria-expanded="false" aria-controls="gnib-collapse-8">
                            I haven't received my IRP card by post even after 10 working days. What should I do ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-8" className="collapse" aria-labelledby="gnib-heading-8" data-parent="#accordion">
                        <div className="card-body">
                        If your card hasn't arrived, please email <a href="mailto:burghquayregoffice@justice.ie?subject=IRP%20card%20not%20received">burghquayregoffice@justice.ie</a> with a subject line 'IRP card not received'
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-9">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-9" aria-expanded="false" aria-controls="gnib-collapse-9">
                            I haven't received my IRP card and I suspect that it might have been sent to an incorrect address. What should I do ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-9" className="collapse" aria-labelledby="gnib-heading-9" data-parent="#accordion">
                        <div className="card-body">
                        If your card hasn't arrived, please email <a href="mailto:burghquayregoffice@justice.ie?subject=IRP%20card%20not%20received">burghquayregoffice@justice.ie</a> with a subject line 'IRP card not received'. Incase, it was sent to an invalid address, it will get returned back to the registration office.<br /><br />
                        You will then be asked to come and collect the card at counter 1 in the office.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-10">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-10" aria-expanded="false" aria-controls="gnib-collapse-10">
                            I'm currently on Stamp 1 and I haven't received my Stamp 4 support letter yet. My GNIB/IRP is going to expire soon. What should I do ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-10" className="collapse" aria-labelledby="gnib-heading-10" data-parent="#accordion">
                        <div className="card-body">
                        If in case, you haven't got your Stamp 4 support letter before your appointment, you can show the acknowledgement receipt that was sent to your email by EPMS (Employment Permits Section) for your 'Request for a Stamp 4 Support Letter' to get a temporary extension.<br /><br />
                        You don't have to pay for this temporary extension.<br /><br />
                        Depending upon when you might get your Stamp 4 letter, your temporary extension shall vary from 1 week to 4 months.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-11">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-11" aria-expanded="false" aria-controls="gnib-collapse-11">
                            I accidentally cancelled my appointment. What should I do ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-11" className="collapse" aria-labelledby="gnib-heading-11" data-parent="#accordion">
                        <div className="card-body">
                        You can either email <a href="mailto:burghquayregoffice@justice.ie">burghquayregoffice@justice.ie</a> (or) on the day of your appointment approach counter 1 to state your case.<br /><br />
                        They will then give you a token for the next slot to complete your registation.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-12">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-12" aria-expanded="false" aria-controls="gnib-collapse-12">
                            I haven't been able to get an appointment and my GNIB/IRP is going to expire soon. What are my options ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-12" className="collapse" aria-labelledby="gnib-heading-12" data-parent="#accordion">
                        <div className="card-body">
                        As received from <a href="mailto:burghquayregoffice@justice.ie">burghquayregoffice@justice.ie</a>, please note that the ensuing gap between the expiration of the current permission and the booked appointment should not create a period of illegal status in the State.<br /><br />
                        So, you can try to book an appointment for a later date post your registration expiry. However, it will be considered an immigration gap which you need to deduct in case you are applying for your naturalisation in the future.<br /><br />
                        You can also try to book an appointment in any category (Work/Other) as it won't be checked.<br /><br />
                        Other option is to approach counter 1 and state your case. But recently, they are very strict and are not providing any direct appointments at the counter.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-13">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-13" aria-expanded="false" aria-controls="gnib-collapse-13">
                            I recently applied for a stamp change. Should I renew my re entry visa ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-13" className="collapse" aria-labelledby="gnib-heading-13" data-parent="#accordion">
                        <div className="card-body">
                        Re-entry visa is valid till it's own expiry regardless of stamp change.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="gnib-heading-14">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#gnib-collapse-14" aria-expanded="false" aria-controls="gnib-collapse-14">
                            I'm waiting for my IRP card and have a valid re-entry visa. Can I travel to another country and return to Ireland before my visa expiry ?
                            </button>
                        </h5>
                    </div>
                    <div id="gnib-collapse-14" className="collapse" aria-labelledby="gnib-heading-14" data-parent="#accordion">
                        <div className="card-body">
                        Yes, the registration stamp in your passport is evidence of your immigration status in the State. You can show the stamp to the immigration officer and mention that you are waiting for your IRP card.
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="d-flex w-100 justify-content-between bg-dark text-white p-2">
               <h5 className="mb-1">Re-Entry Visa</h5>
            </div>
            <br />
            <div className="card">
                <div className="card-header" id="visa-heading-1">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#visa-collapse-1" aria-expanded="false" aria-controls="visa-collapse-1">
                        I haven't got my IRP card by post. Can I apply for a re entry visa ?
                        </button>
                    </h5>
                </div>
                <div id="visa-collapse-1" className="collapse" aria-labelledby="visa-heading-1" data-parent="#accordion">
                    <div className="card-body">
                    Yes, the registration stamp in your passport is evidence of your immigration status in the State. This stamp is sufficient for applying for a Re Entry visa and, if appropriate, for taking up employment.
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header" id="visa-heading-2">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#visa-collapse-2" aria-expanded="false" aria-controls="visa-collapse-2">
                        How soon will I receive a decision ?
                        </button>
                    </h5>
                </div>
                <div id="visa-collapse-2" className="collapse" aria-labelledby="visa-heading-2" data-parent="#accordion">
                    <div className="card-body">
                    It can take up to 15 - 20 working days to process a re-entry visa application submitted by post.<br /><br />
                    To estimate when your visa (if approved) will be ready, you should also include extra time for weekends, public holidays and postal transit.<br /><br />
                    Processing times also vary based on the number of applications we receive. In general, we are busiest before Christmas and during the summer.
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header" id="visa-heading-3">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#visa-collapse-3" aria-expanded="false" aria-controls="visa-collapse-3">
                        How are the documents and visa returned back to me ?
                        </button>
                    </h5>
                </div>
                <div id="visa-collapse-3" className="collapse" aria-labelledby="visa-heading-3" data-parent="#accordion">
                    <div className="card-body">
                    Documents and visas (if approved) are now being returned to applicants by registered post. You can track the same via <a href="https://track.anpost.ie/">Anpost</a>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header" id="visa-heading-4">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#visa-collapse-4" aria-expanded="false" aria-controls="visa-collapse-4">
                        Can I travel to UK without a tourist visa ?
                        </button>
                    </h5>
                </div>
                <div id="visa-collapse-4" className="collapse" aria-labelledby="visa-heading-4" data-parent="#accordion">
                    <div className="card-body">
                    If your Irish visa has <a href="https://www.dfa.ie/media/embassychina/visas/BIVS-information-note-EN.pdf">BIVS stamp</a>, then you can travel to UK without the need for a separate tourist visa.
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header" id="visa-heading-5">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#visa-collapse-5" aria-expanded="false" aria-controls="visa-collapse-5">
                        Can I send documents for my family together ?
                        </button>
                    </h5>
                </div>
                <div id="visa-collapse-5" className="collapse" aria-labelledby="visa-heading-5" data-parent="#accordion">
                    <div className="card-body">
                    If you are making applications for more than 1 person (eg a family), submit them together. To do so:<br/><br/>
                    1. Place each person's application documents into separate ordinary envelopes<br/><br/>
                    2. Write the name of each applicant on each envelope<br/><br/>
                    3. Then place each envelope into a larger (padded) envelope<br/><br/>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header" id="visa-heading-6">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#visa-collapse-6" aria-expanded="false" aria-controls="visa-collapse-6">
                        Can I get multi entry visa during my emergency appointment ?
                        </button>
                    </h5>
                </div>
                <div id="visa-collapse-6" className="collapse" aria-labelledby="visa-heading-6" data-parent="#accordion">
                    <div className="card-body">
                    In some circumstances you can by paying 200 EUR.
                    </div>
                </div>
            </div>
            <br />
            <div className="d-flex w-100 justify-content-between bg-dark text-white p-2">
               <h5 className="mb-1">Stamp 4 Support Letter</h5>
            </div>
            <br />
            <div className="card">
                <div className="card-header" id="s4sl-heading-1">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#s4sl-collapse-1" aria-expanded="false" aria-controls="s4sl-collapse-1">
                        Will I receive an acknowledgement after I send my support letter request form with required documents ?
                        </button>
                    </h5>
                </div>
                <div id="s4sl-collapse-1" className="collapse" aria-labelledby="s4sl-heading-1" data-parent="#accordion">
                    <div className="card-body">
                    You will receive an email from EPMS DJEI (Employment Permits Section) acknowledging the receipt of your Request for a Stamp 4 Support Letter.
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header" id="s4sl-heading-2">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#s4sl-collapse-2" aria-expanded="false" aria-controls="s4sl-collapse-2">
                        Can I track the current processing dates for stamp 4 support letter ?
                        </button>
                    </h5>
                </div>
                <div id="s4sl-collapse-2" className="collapse" aria-labelledby="s4sl-heading-2" data-parent="#accordion">
                    <div className="card-body">
                    You can either track it via <a href="https://dbei.gov.ie/en/What-We-Do/Workplace-and-Skills/Employment-Permits/Current-Application-Processing-Dates/Current-Processing-Dates-for-Employment-Permits.html">Current-Processing-Dates-for-Employment-Permits</a> (or) subscribe for <a href="https://m.me/dbei-bot">messenger notifications</a> 
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header" id="s4sl-heading-3">
                    <h5 className="mb-0">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#s4sl-collapse-3" aria-expanded="false" aria-controls="s4sl-collapse-3">
                        I haven't received my support letter even though it has been issued. What should I do ?
                        </button>
                    </h5>
                </div>
                <div id="s4sl-collapse-3" className="collapse" aria-labelledby="s4sl-heading-3" data-parent="#accordion">
                    <div className="card-body">
                    You can email <a href="mailto:employmentpermits@dbei.gov.ie">employmentpermits@dbei.gov.ie</a> to check if the letter has been posted to the correct address.<br /><br />
                    If the address is wrong, then you can ask them to re-issue the letter to the correct address.<br /><br />
                    You can also reach out to <a href="mailto:info@dbei.gov.ie">info@dbei.gov.ie</a> to escalate if you don't receive a response from Employment Permits team.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faq;