/*
Reply box that can be opened with button click
*/
const Reply = () => {
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md">
        <textarea
          placeholder="Type your reply..."
          rows={3}
          className="w-full p-2"
        />
        {/* Add logic for submitting the reply */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Submit Reply
        </button>
      </div>
    </>
  )
}
export default Reply
