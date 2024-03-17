import React from 'react';
import {View, Text, Button} from 'react-native';

type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({totalItems, itemsPerPage, currentPage, totalPages, onPageChange}) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };


    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
            <Button title="Previous Page" onPress={handlePrevPage} disabled={currentPage === 1}/>
            <Text style={{alignSelf: 'center'}}>
                Page {currentPage} of {totalPages}
            </Text>
            <Button title="Next Page" onPress={handleNextPage} disabled={currentPage === totalPages}/>
        </View>
    );
};

export default Pagination;